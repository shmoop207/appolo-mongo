import {Schema} from "../lib/schema";
import {prop, schema} from "../lib/decorators";


@schema("TestNestedDeep", {strict: true})
export class TestNestedDeep extends Schema {

    _id: string;

    @prop({type: String})
    deep: string;

    @prop({type: String})
    deepArray: string[];

}
