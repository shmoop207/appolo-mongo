"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const testNested_1 = require("./testNested");
const tesRef_1 = require("./tesRef");
const decorators_1 = require("../lib/decorators");
const schema_1 = require("../lib/schema");
let Test = class Test extends schema_1.Schema {
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
], Test.prototype, "name", void 0);
tslib_1.__decorate([
    decorators_1.prop(testNested_1.TestNested)
], Test.prototype, "nested", void 0);
tslib_1.__decorate([
    decorators_1.prop({ ref: tesRef_1.TesRef })
], Test.prototype, "testRef", void 0);
tslib_1.__decorate([
    decorators_1.prop([{ ref: tesRef_1.TesRef }])
], Test.prototype, "testRefArr", void 0);
tslib_1.__decorate([
    decorators_1.virtual()
], Test.prototype, "setName", null);
tslib_1.__decorate([
    decorators_1.method()
], Test.prototype, "setName2", null);
tslib_1.__decorate([
    decorators_1.pre("save")
], Test.prototype, "preSave", null);
tslib_1.__decorate([
    decorators_1.staticMethod()
], Test, "setName3", null);
Test = tslib_1.__decorate([
    decorators_1.schema("Test", { strict: true })
], Test);
exports.Test = Test;
//# sourceMappingURL=test.js.map