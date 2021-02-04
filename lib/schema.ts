import "reflect-metadata";
import {Objects, Arrays, Reflector, Enums} from "@appolo/utils";
import {Connection, Document, Model, Schema as MongoseSchema, SchemaOptions} from "mongoose";

import {SchemaData, SchemaDefineKey} from "./interfaces";

export const SchemaKey = Symbol("schema");
export const ModelKey = Symbol("model");


export class Schema {

    public static get collectionName(): string {
        return Reflector.getFnMetadata<SchemaData>(SchemaDefineKey, this.prototype as Function).name
    }

    public static createSchema(options?: SchemaOptions): MongoseSchema {

        let data = Reflector.getFnMetadata<SchemaData>(SchemaDefineKey, this.prototype as Function);

        if (!data) {
            throw new Error("schema not defined");
        }


        let schemaConfig: any = {};
        Arrays.forEach(data.props, (value, key) => {
            schemaConfig[key] = this._prepareSchema(value);
        });

        let schema = new MongoseSchema(schemaConfig, data.options || options || {});

        Arrays.forEach(data.methods, (value, key) => schema.method(key as string, value as any));
        Arrays.forEach(data.staticMethod, (value, key) => schema.static(key as string, value as any));
        Arrays.forEach(data.virtual, (value: PropertyDescriptor, key: string) => {
            let virtual = schema.virtual(key);
            value.get && virtual.get(value.get);
            value.set && virtual.set(value.set);
        });

        Arrays.forEach(data.pre, value => schema.pre(value.name, value.fn as any));
        Arrays.forEach(data.post, value => schema.post(value.name, value.fn as any));

        Arrays.forEach(data.indexes, (value) => schema.index(value.fields, value.options));

        Reflect.defineMetadata(SchemaKey, schema, this.prototype);

        return schema
    }


    private static _prepareSchema(schema: any): any {
        if (Array.isArray(schema)) {
            return [this._prepareSchema(schema[0])]
        }

        if (Schema.prototype.isPrototypeOf(schema.prototype)) {

            schema = schema.getSchema()

        } else if (schema.type && Schema.prototype.isPrototypeOf(schema.type.prototype)) {

            schema.type = schema.type.getSchema()

        } else if (schema.ref && Schema.prototype.isPrototypeOf(schema.ref.prototype)) {

            schema.ref = schema.ref.collectionName;

            schema = Objects.defaults({}, schema, {type: MongoseSchema.Types.ObjectId})

        } else if (schema.enum && !Array.isArray(schema.enum)) {

            schema = Object.assign({}, schema, {enum: Enums.values(schema.enum)})
        }

        return schema
    }

    public static getSchema(): MongoseSchema {
        return Reflect.getOwnMetadata(SchemaKey, this.prototype) || this.createSchema();
    }

    public static createModel<T>(connection: Connection, options?: SchemaOptions): Model<T & Document> {

        let schema: MongoseSchema<any> = this.getSchema() || this.createSchema(options);

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
