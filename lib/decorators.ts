import "reflect-metadata";
import {Schema as MongoSchema, SchemaOptions, SchemaType, SchemaTypeOpts} from "mongoose";
import {IndexOptions} from "mongodb";
import {Utils} from "./utils";
import {PostType, PreType, SchemaData, SchemaDefineKey} from "./interfaces";
import {Schema} from "./schema";


export function schema(name?: string, options?: SchemaOptions) {
    return function (fn: typeof Schema) {

        let data = Utils.getReflectData<SchemaData>(SchemaDefineKey, fn.prototype, {});

        data.name = name || fn.name;
        data.options = options;
    }
}

export function prop(schema: SchemaTypeOpts<any> | MongoSchema | SchemaType) {

    return function (target: any, propertyKey: string, descriptor?: PropertyDescriptor) {

        let data = Utils.getReflectData<SchemaData>(SchemaDefineKey, target, {});

        if (!data.props) {
            data.props = {};
        }

        data.props[propertyKey] = schema as SchemaTypeOpts<any>;
    }
}

export function method() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let data = Utils.getReflectData<SchemaData>(SchemaDefineKey, target, {});

        if (!data.methods) {
            data.methods = {};
        }

        data.methods[propertyKey] = descriptor.value;
    }
}

export function staticMethod() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let data = Utils.getReflectData<SchemaData>(SchemaDefineKey, target.prototype, {});

        if (!data.staticMethod) {
            data.staticMethod = {};
        }

        data.staticMethod[propertyKey] = descriptor.value;
    }
}

export function virtual() {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let data = Utils.getReflectData<SchemaData>(SchemaDefineKey, target, {});

        if (!data.virtual) {
            data.virtual = {};
        }

        data.virtual[propertyKey] = Object.getOwnPropertyDescriptor(target, propertyKey);
    }
}

export function pre(name: PreType) {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let data = Utils.getReflectData<SchemaData>(SchemaDefineKey, target, {});

        if (!data.pre) {
            data.pre = {};
        }

        data.pre[propertyKey] = {
            fn: descriptor.value,
            name
        }
    }
}

export function post(name: PostType) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let data = Utils.getReflectData<SchemaData>(SchemaDefineKey, target, {});

        if (!data.post) {
            data.post = {};
        }

        data.post[propertyKey] = {
            fn: descriptor.value,
            name
        }
    }
}

export function index(fields: any, options?: IndexOptions) {
    return function (target: any) {
        let data = Utils.getReflectData<SchemaData>(SchemaDefineKey, target.prototype, {});

        if (!data.indexes) {
            data.indexes = [];
        }

        data.indexes.push({
            fields,
            options
        })
    }
}

