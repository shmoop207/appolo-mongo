"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
require("reflect-metadata");
const mongoose_1 = require("mongoose");
const interfaces_1 = require("./interfaces");
const utils_1 = require("./utils");
exports.SchemaKey = Symbol("schema");
exports.ModelKey = Symbol("model");
class Schema {
    static get collectionName() {
        return utils_1.Utils.getReflectData(interfaces_1.SchemaDefineKey, this.prototype).name;
    }
    static createSchema(options) {
        let data = utils_1.Utils.getReflectData(interfaces_1.SchemaDefineKey, this.prototype);
        if (!data) {
            throw new Error("schema not defined");
        }
        let schemaConfig = _.reduce(data.props, (dto, value, key) => {
            dto[key] = this._prepareSchema(value);
            return dto;
        }, {});
        let schema = new mongoose_1.Schema(schemaConfig, data.options || options || {});
        _.forEach(data.methods, (value, key) => schema.method(key, value));
        _.forEach(data.staticMethod, (value, key) => schema.static(key, value));
        _.forEach(data.virtual, (value, key) => {
            let virtual = schema.virtual(key);
            value.get && virtual.get(value.get);
            value.set && virtual.set(value.set);
        });
        _.forEach(data.pre, value => schema.pre(value.name, value.fn));
        _.forEach(data.post, value => schema.post(value.name, value.fn));
        _.forEach(data.indexes, (value) => schema.index(value.fields, value.options));
        Reflect.defineMetadata(exports.SchemaKey, schema, this.prototype);
        return schema;
    }
    static _prepareSchema(schema) {
        if (_.isArray(schema)) {
            return [this._prepareSchema(schema[0])];
        }
        if (Schema.prototype.isPrototypeOf(schema.prototype)) {
            schema = schema.getSchema();
        }
        else if (schema.ref && Schema.prototype.isPrototypeOf(schema.ref.prototype)) {
            schema = _.extend({}, schema, { type: mongoose_1.Schema.Types.ObjectId, ref: schema.ref.collectionName });
        }
        else if (schema.enum && !Array.isArray(schema.enum)) {
            schema = _.extend({}, schema, { enum: utils_1.Utils.enumValues(schema.enum) });
        }
        return schema;
    }
    static getSchema() {
        return Reflect.getOwnMetadata(exports.SchemaKey, this.prototype) || this.createSchema();
    }
    static createModel(connection, options) {
        let schema = this.getSchema() || this.createSchema(options);
        if (!schema) {
            throw new Error("schema not define");
        }
        let schemaName = this.collectionName;
        if (!schemaName) {
            throw new Error("schemaName not define");
        }
        let modelItem = connection.model(schemaName, schema);
        Reflect.defineMetadata(exports.ModelKey, modelItem, this.prototype);
        return modelItem;
    }
    static getModel(connection) {
        return Reflect.getOwnMetadata(exports.ModelKey, this.prototype) || this.createModel(connection);
    }
}
exports.Schema = Schema;
//# sourceMappingURL=schema.js.map