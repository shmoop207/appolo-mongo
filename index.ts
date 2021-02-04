import "reflect-metadata";

export * from "./lib/decorators"
import {Ref, Doc, Model} from "./lib/interfaces"
import {Schema} from "./lib/schema"
import {Types} from "mongoose"

const ObjectId = Types.ObjectId;

export {Ref, Doc, Model, Schema, ObjectId}


