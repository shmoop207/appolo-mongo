"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = exports.ModelKey = exports.SchemaKey = void 0;
require("reflect-metadata");
const utils_1 = require("@appolo/utils");
const mongoose_1 = require("mongoose");
const interfaces_1 = require("./interfaces");
exports.SchemaKey = Symbol("schema");
exports.ModelKey = Symbol("model");
class Schema {
    static get collectionName() {
        return utils_1.Reflector.getFnMetadata(interfaces_1.SchemaDefineKey, this.prototype).name;
    }
    static createSchema(options) {
        let data = utils_1.Reflector.getFnMetadata(interfaces_1.SchemaDefineKey, this.prototype);
        if (!data) {
            throw new Error("schema not defined");
        }
        let schemaConfig = {};
        utils_1.Arrays.forEach(data.props, (value, key) => {
            schemaConfig[key] = this._prepareSchema(value);
        });
        let schema = new mongoose_1.Schema(schemaConfig, data.options || options || {});
        utils_1.Arrays.forEach(data.methods, (value, key) => schema.method(key, value));
        utils_1.Arrays.forEach(data.staticMethod, (value, key) => schema.static(key, value));
        utils_1.Arrays.forEach(data.virtual, (value, key) => {
            let virtual = schema.virtual(key);
            value.get && virtual.get(value.get);
            value.set && virtual.set(value.set);
        });
        utils_1.Arrays.forEach(data.pre, value => schema.pre(value.name, value.fn));
        utils_1.Arrays.forEach(data.post, value => schema.post(value.name, value.fn));
        utils_1.Arrays.forEach(data.indexes, (value) => schema.index(value.fields, value.options));
        Reflect.defineMetadata(exports.SchemaKey, schema, this.prototype);
        return schema;
    }
    static _prepareSchema(schema) {
        if (Array.isArray(schema)) {
            return [this._prepareSchema(schema[0])];
        }
        if (Schema.prototype.isPrototypeOf(schema.prototype)) {
            schema = schema.getSchema();
        }
        else if (schema.type && Schema.prototype.isPrototypeOf(schema.type.prototype)) {
            schema.type = schema.type.getSchema();
        }
        else if (schema.ref && Schema.prototype.isPrototypeOf(schema.ref.prototype)) {
            schema.ref = schema.ref.collectionName;
            schema = utils_1.Objects.defaults({}, schema, { type: mongoose_1.Schema.Types.ObjectId });
        }
        else if (schema.enum && !Array.isArray(schema.enum)) {
            schema = Object.assign({}, schema, { enum: utils_1.Enums.values(schema.enum) });
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