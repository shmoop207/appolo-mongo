import "reflect-metadata";
import {Schema as MongoSchema, SchemaOptions, SchemaType,IndexOptions} from "mongoose";
import {PostType, PreType, SchemaData, SchemaDefineKey, SchemaTypeOptions} from "./interfaces";
import {Schema} from "./schema";
import {Objects, Arrays, Reflector} from "@appolo/utils";


export function schema(name?: string, options?: SchemaOptions) {
    return function (fn: typeof Schema) {

        let data = Reflector.getFnMetadata<SchemaData>(SchemaDefineKey, fn.prototype as Function, {});

        if (Objects.isObject(name)) {
            name = "";
            options = name as SchemaOptions;

        }

        data.name = name || fn.name;
        data.options = options;
    }
}

export function propRef(ref: any, schema?: SchemaTypeOptions<any>) {

    schema = Objects.defaults({}, schema || {}, {ref: ref, type: MongoSchema.Types.ObjectId});

    return prop(schema);
}

export function propRefArray(ref: any, schema?: SchemaTypeOptions<any>) {

    schema = Objects.defaults({}, schema || {}, {ref: ref, type: MongoSchema.Types.ObjectId});

    return prop([schema]);
}

export function propArray(type: any, schema?: SchemaTypeOptions<any> | MongoSchema | SchemaType) {

    schema = Objects.defaults({}, (schema as object) || {}, {type: type});

    return prop([schema]);
}


export function prop(schema?: typeof Schema | SchemaTypeOptions<any> | MongoSchema | SchemaType | (typeof Schema | SchemaTypeOptions<any> | MongoSchema | SchemaType)[]) {

    return function (target: any, propertyKey: string, descriptor?: PropertyDescriptor) {

        let data = Reflector.getFnMetadata<SchemaData>(SchemaDefineKey, target, {});

        let type = Reflect.getMetadata("design:type", target, propertyKey);

        if (type && (!schema || (Objects.isPlain(schema) && !((schema as SchemaTypeOptions<any>).ref)))) {
            schema = Objects.defaults({}, (schema as object) || {}, {type: type})
        }

        if (!data.props) {
            data.props = {};
        }

        data.props[propertyKey] = schema as SchemaTypeOptions<any>;
    }
}

export function method() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let data = Reflector.getFnMetadata<SchemaData>(SchemaDefineKey, target, {});

        if (!data.methods) {
            data.methods = {};
        }

        data.methods[propertyKey] = descriptor.value;
    }
}

export function staticMethod() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let data = Reflector.getFnMetadata<SchemaData>(SchemaDefineKey, target.prototype, {});

        if (!data.staticMethod) {
            data.staticMethod = {};
        }

        data.staticMethod[propertyKey] = descriptor.value;
    }
}

export function virtual() {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let data = Reflector.getFnMetadata<SchemaData>(SchemaDefineKey, target, {});

        if (!data.virtual) {
            data.virtual = {};
        }

        data.virtual[propertyKey] = Object.getOwnPropertyDescriptor(target, propertyKey);
    }
}

export function pre(name: PreType) {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let data = Reflector.getFnMetadata<SchemaData>(SchemaDefineKey, target, {});

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
        let data = Reflector.getFnMetadata<SchemaData>(SchemaDefineKey, target, {});

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
        let data = Reflector.getFnMetadata<SchemaData>(SchemaDefineKey, target.prototype, {});

        if (!data.indexes) {
            data.indexes = [];
        }

        data.indexes.push({
            fields,
            options
        })
    }
}

