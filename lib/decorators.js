"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const utils_1 = require("./utils");
const interfaces_1 = require("./interfaces");
function schema(name, options) {
    return function (fn) {
        let data = utils_1.Utils.getReflectData(interfaces_1.SchemaDefineKey, fn.prototype, {});
        data.name = name || fn.name;
        data.options = options;
    };
}
exports.schema = schema;
function prop(schema) {
    return function (target, propertyKey, descriptor) {
        let data = utils_1.Utils.getReflectData(interfaces_1.SchemaDefineKey, target, {});
        if (!data.props) {
            data.props = {};
        }
        data.props[propertyKey] = schema;
    };
}
exports.prop = prop;
function method() {
    return function (target, propertyKey, descriptor) {
        let data = utils_1.Utils.getReflectData(interfaces_1.SchemaDefineKey, target, {});
        if (!data.methods) {
            data.methods = {};
        }
        data.methods[propertyKey] = descriptor.value;
    };
}
exports.method = method;
function staticMethod() {
    return function (target, propertyKey, descriptor) {
        let data = utils_1.Utils.getReflectData(interfaces_1.SchemaDefineKey, target.prototype, {});
        if (!data.staticMethod) {
            data.staticMethod = {};
        }
        data.staticMethod[propertyKey] = descriptor.value;
    };
}
exports.staticMethod = staticMethod;
function virtual() {
    return function (target, propertyKey, descriptor) {
        let data = utils_1.Utils.getReflectData(interfaces_1.SchemaDefineKey, target, {});
        if (!data.virtual) {
            data.virtual = {};
        }
        data.virtual[propertyKey] = Object.getOwnPropertyDescriptor(target, propertyKey);
    };
}
exports.virtual = virtual;
function pre(name) {
    return function (target, propertyKey, descriptor) {
        let data = utils_1.Utils.getReflectData(interfaces_1.SchemaDefineKey, target, {});
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
        let data = utils_1.Utils.getReflectData(interfaces_1.SchemaDefineKey, target, {});
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
        let data = utils_1.Utils.getReflectData(interfaces_1.SchemaDefineKey, target.prototype, {});
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