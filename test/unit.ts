"use strict";
import chai = require('chai');
import mongoose = require('mongoose');
import {TestModel} from "./testModel";
import {TesRef} from "./tesRef";


let should = chai.should();

describe("schema", function () {


    it('should create valid schema', async () => {

        let model = TestModel.getModel(mongoose.connection);
        let model2 = TesRef.getModel(mongoose.connection);

        model.schema.methods.setName2.should.be.ok;
        model.schema.statics.setName3.should.be.ok;
        model.schema.obj.name.type.should.be.eq(String)
        model.schema.obj.nested.obj.deep.type.should.be.eq(String);

        model.schema.obj.testRef.ref.should.be.eq("TesRef")

        model2.schema.indexes()[0][0].bla.should.be.eq(1);
        model2.schema.indexes()[0][1].unique.should.be.eq(true);

    });


});