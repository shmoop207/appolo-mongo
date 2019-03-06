import {TestNested} from "./testNested";
import {TesRef} from "./tesRef";
import {method, pre, prop, schema, staticMethod, virtual} from "../lib/decorators";
import {Schema} from "../lib/schema";
import {DocType, ModelType, Ref} from "../lib/interfaces";


@schema("Test", {strict: true})
export class TestModel extends Schema {

    _id: string;

    @prop({type: String})
    name: string;

    @prop(TestNested)
    nested: TestNested;

    @prop({ref: TesRef})
    testRef: Ref<TesRef>;

    @prop([{ref: TesRef}])
    testRefArr: Ref<TesRef>;

    @virtual()
    set setName(name) {
        this.name += name;
    }

    @method()
    setName2(this: DocType<TestModel>,name) {
        this.save += name;
    }

    @staticMethod()
    static setName3(this: ModelType<TestModel>,name) {
        return this.findById(name);
    }

    @pre("save")
    private preSave(){

    }

}