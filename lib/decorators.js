"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = exports.post = exports.pre = exports.virtual = exports.staticMethod = exports.method = exports.prop = exports.propArray = exports.propRefArray = exports.propRef = exports.schema = void 0;
require("reflect-metadata");
const mongoose_1 = require("mongoose");
const interfaces_1 = require("./interfaces");
const utils_1 = require("@appolo/utils");
function schema(name, options) {
    return function (fn) {
        let data = utils_1.Reflector.getFnMetadata(interfaces_1.SchemaDefineKey, fn.prototype, {});
        if (utils_1.Objects.isObject(name)) {
            name = "";
            options = name;
        }
        data.name = name || fn.name;
        data.options = options;
    };
}
exports.schema = schema;
function propRef(ref, schema) {
    schema = utils_1.Objects.defaults({}, schema || {}, { ref: ref, type: mongoose_1.Schema.Types.ObjectId });
    return prop(schema);
}
exports.propRef = propRef;
function propRefArray(ref, schema) {
    schema = utils_1.Objects.defaults({}, schema || {}, { ref: ref, type: mongoose_1.Schema.Types.ObjectId });
    return prop([schema]);
}
exports.propRefArray = propRefArray;
function propArray(type, schema) {
    schema = utils_1.Objects.defaults({}, schema || {}, { type: type });
    return prop([schema]);
}
exports.propArray = propArray;
function prop(schema) {
    return function (target, propertyKey, descriptor) {
        let data = utils_1.Reflector.getFnMetadata(interfaces_1.SchemaDefineKey, target, {});
        let type = Reflect.getMetadata("design:type", target, propertyKey);
        if (type && (!schema || (utils_1.Objects.isPlain(schema) && !(schema.ref)))) {
            schema = utils_1.Objects.defaults({}, schema || {}, { type: type });
        }
        if (!data.props) {
            data.props = {};
        }
        data.props[propertyKey] = schema;
    };
}
exports.prop = prop;
function method() {
    return function (target, propertyKey, descriptor) {
        let data = utils_1.Reflector.getFnMetadata(interfaces_1.SchemaDefineKey, target, {});
        if (!data.methods) {
            data.methods = {};
        }
        data.methods[propertyKey] = descriptor.value;
    };
}
exports.method = method;
function staticMethod() {
    return function (target, propertyKey, descriptor) {
        let data = utils_1.Reflector.getFnMetadata(interfaces_1.SchemaDefineKey, target.prototype, {});
        if (!data.staticMethod) {
            data.staticMethod = {};
        }
        data.staticMethod[propertyKey] = descriptor.value;
    };
}
exports.staticMethod = staticMethod;
function virtual() {
    return function (target, propertyKey, descriptor) {
        let data = utils_1.Reflector.getFnMetadata(interfaces_1.SchemaDefineKey, target, {});
        if (!data.virtual) {
            data.virtual = {};
        }
        data.virtual[propertyKey] = Object.getOwnPropertyDescriptor(target, propertyKey);
    };
}
exports.virtual = virtual;
function pre(name) {
    return function (target, propertyKey, descriptor) {
        let data = utils_1.Reflector.getFnMetadata(interfaces_1.SchemaDefineKey, target, {});
        if (!data.pre) {
            data.pre = {};
        }
        data.pre[propertyKey] = {
            fn: descriptor.value,
            name
        };
    };
}
exports.pre = pre;
function post(name) {
    return function (target, propertyKey, descriptor) {
        let data = utils_1.Reflector.getFnMetadata(interfaces_1.SchemaDefineKey, target, {});
        if (!data.post) {
            data.post = {};
        }
        data.post[propertyKey] = {
            fn: descriptor.value,
            name
        };
    };
}
exports.post = post;
function index(fields, options) {
    return function (target) {
        let data = utils_1.Reflector.getFnMetadata(interfaces_1.SchemaDefineKey, target.prototype, {});
        if (!data.indexes) {
            data.indexes = [];
        }
        data.indexes.push({
            fields,
            options
        });
    };
}
exports.index = index;
//# sourceMappingURL=decorators.js.map