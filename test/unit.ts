"use strict";
import chai = require('chai');
import mongoose = require('mongoose');
import {Test} from "./test";
import {TesRef} from "./tesRef";
import {Doc} from "../lib/interfaces";


let should = chai.should();

describe("schema", function () {


    it('should create valid schema', async () => {

        let model = Test.getModel<Test>(mongoose.connection);
        let model2 = TesRef.getModel<TesRef>(mongoose.connection);

        model.schema.methods.setName2.should.be.ok;
        model.schema.statics.setName3.should.be.ok;
        (model.schema.obj as any).name.type.should.be.eq(String);
        (model.schema.obj as any).name2.type.should.be.eq(String);
        (model.schema.obj as any).nested.obj.deep.type.should.be.eq(String);

        (model.schema.obj.testRef as any).ref.should.be.eq("TesRef");

        (model2.schema.indexes()[0][0] as any) .bla.should.be.eq(1);
        (model2.schema.indexes()[0][1] as any).unique.should.be.eq(true);

    });


});
