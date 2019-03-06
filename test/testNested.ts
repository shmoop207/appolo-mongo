import {TestNestedDeep} from "./testNestedDeep";
import {prop, schema} from "../lib/decorators";


@schema("TestNested", {strict: true})
export class TestNested extends TestNestedDeep {

    _id: string;

    @prop({type: String})
    name: string;

}