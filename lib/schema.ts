import _ = require('lodash');
import "reflect-metadata";
import {Connection, Document, Model, Schema as MongoseScheam, SchemaOptions} from "mongoose";

import {SchemaData, SchemaDefineKey} from "./interfaces";
import {Utils} from "./utils";

export const SchemaKey = Symbol("schema");
export const ModelKey = Symbol("model");


export class Schema {

    public static get collectionName(): string {
        return Utils.getReflectData<SchemaData>(SchemaDefineKey, this.prototype).name
    }

    public static createSchema(options?: SchemaOptions): MongoseScheam {

        let data = Utils.getReflectData<SchemaData>(SchemaDefineKey, this.prototype);

        if (!data) {
            throw new Error("schema not defined");
        }

        let schemaConfig = _.reduce(data.props, (dto: any, value, key) => {
            dto[key] = this._prepareSchema(value);
            return dto;
        }, {});

        let schema = new MongoseScheam(schemaConfig, data.options || options || {});

        _.forEach(data.methods, (value, key) => schema.method(key, value));
        _.forEach(data.staticMethod, (value, key) => schema.static(key, value));
        _.forEach(data.virtual, (value: PropertyDescriptor, key: string) => {
            let virtual = schema.virtual(key);
            value.get && virtual.get(value.get);
            value.set && virtual.set(value.set);
        });

        _.forEach(data.pre, value => schema.pre(value.name, value.fn as any));
        _.forEach(data.post, value => schema.post(value.name, value.fn as any));

        _.forEach(data.indexes, (value) => schema.index(value.fields, value.options));

        Reflect.defineMetadata(SchemaKey, schema, this.prototype);

        return schema
    }


    private static _prepareSchema(schema: any): any {
        if (_.isArray(schema)) {
            return [this._prepareSchema(schema[0])]
        }

        if (Schema.prototype.isPrototypeOf(schema.prototype)) {
            schema = schema.getSchema()
        } else if (schema.ref && Schema.prototype.isPrototypeOf(schema.ref.prototype)) {
            schema = _.extend({}, schema, {type: MongoseScheam.Types.ObjectId, ref: schema.ref.collectionName})
        } else if (schema.enum && !Array.isArray(schema.enum)) {

            schema = _.extend({}, schema, {enum: Utils.enumValues(schema.enum)})
        }

        return schema
    }

    public static getSchema(): MongoseScheam {
        return Reflect.getOwnMetadata(SchemaKey, this.prototype) || this.createSchema();
    }

    public static createModel<T>(connection: Connection, options?: SchemaOptions): Model<T & Document> {

        let schema = this.getSchema() || this.createSchema(options);

        if (!schema) {
            throw new Error("schema not define");
        }

        let schemaName = this.collectionName;

        if (!schemaName) {
            throw new Error("schemaName not define");
        }

        let modelItem = connection.model<T & Document>(schemaName, schema);

        Reflect.defineMetadata(ModelKey, modelItem, this.prototype);

        return modelItem;
    }


    public static getModel<T>(connection: Connection): Model<T & Document> {
        return Reflect.getOwnMetadata(ModelKey, this.prototype) || this.createModel(connection);
    }
}