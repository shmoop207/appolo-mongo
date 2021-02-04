import {Document, Model as MongooseModel, Schema as MongooseSchema, SchemaOptions, SchemaTypeOpts} from "mongoose";
import {IndexOptions} from "mongodb";
import {Schema} from "./schema";


export type Ref<T, K = MongooseSchema.Types.ObjectId | string> = T & Document | K;

export type Doc<T> = T & Document;

export type Model<T extends Schema> = MongooseModel<Doc<T>>;

export interface SchemaData {
    name?: string
    options?: SchemaOptions
    props?: { [index: string]: SchemaTypeOpts<any> }
    methods?: { [index: string]: Function }
    staticMethod?: { [index: string]: Function }
    virtual?: { [index: string]: PropertyDescriptor }
    indexes?: { fields: any, options: IndexOptions }[],
    pre?: { [index: string]: { name: string, fn: Function } }
    post?: { [index: string]: { name: string, fn: Function } }
}

export const SchemaDefineKey = Symbol("schemaDefine");


export type PreType = | "count" | "init" | "validate" | "remove"
    | "find"
    | "findOne"
    | "findOneAndRemove"
    | "findOneAndUpdate"
    | "update"
    | "updateOne"
    | "updateMany" | "aggregate" | "insertMany" | "save" | "insertMany"


export type PostType = | "count"
    | "find"
    | "findOne"
    | "findOneAndRemove"
    | "findOneAndUpdate"
    | "update"
    | "init"
    | "validate"
    | "save"
    | "remove"


// @ts-ignore
export interface SchemaTypeOptions<T> extends SchemaTypeOpts<T> {

    type?: T;

    ref?: any;


}
