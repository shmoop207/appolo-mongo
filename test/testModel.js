"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const testNested_1 = require("./testNested");
const tesRef_1 = require("./tesRef");
const decorators_1 = require("../lib/decorators");
const schema_1 = require("../lib/schema");
let TestModel = class TestModel extends schema_1.Schema {
    set setName(name) {
        this.name += name;
    }
    setName2(name) {
        this.save += name;
    }
    static setName3(name) {
        return this.findById(name);
    }
    preSave() {
    }
};
tslib_1.__decorate([
    decorators_1.prop({ type: String })
], TestModel.prototype, "name", void 0);
tslib_1.__decorate([
    decorators_1.prop(testNested_1.TestNested)
], TestModel.prototype, "nested", void 0);
tslib_1.__decorate([
    decorators_1.prop({ ref: tesRef_1.TesRef })
], TestModel.prototype, "testRef", void 0);
tslib_1.__decorate([
    decorators_1.prop([{ ref: tesRef_1.TesRef }])
], TestModel.prototype, "testRefArr", void 0);
tslib_1.__decorate([
    decorators_1.virtual()
], TestModel.prototype, "setName", null);
tslib_1.__decorate([
    decorators_1.method()
], TestModel.prototype, "setName2", null);
tslib_1.__decorate([
    decorators_1.pre("save")
], TestModel.prototype, "preSave", null);
tslib_1.__decorate([
    decorators_1.staticMethod()
], TestModel, "setName3", null);
TestModel = tslib_1.__decorate([
    decorators_1.schema("Test", { strict: true })
], TestModel);
exports.TestModel = TestModel;
//# sourceMappingURL=testModel.js.map