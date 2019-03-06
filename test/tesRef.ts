import {index, prop, schema} from "../lib/decorators";
import {Schema} from "../lib/schema";


enum Test {
    A ="aaa",
    B = 1,
    F = 2,
    C = "11",
    D= "111"

}
@schema("TesRef", {strict: true})
@index({bla:1},{ unique: true })
export class TesRef extends Schema {

    _id: string;

    @prop({type: String,enum:Test})
    bla: string;
}