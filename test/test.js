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
    decorators_1.prop({ type: String }),
    tslib_1.__metadata("design:type", String)
], Test.prototype, "name", void 0);
tslib_1.__decorate([
    decorators_1.prop(),
    tslib_1.__metadata("design:type", String)
], Test.prototype, "name2", void 0);
tslib_1.__decorate([
    decorators_1.prop(testNested_1.TestNested),
    tslib_1.__metadata("design:type", testNested_1.TestNested)
], Test.prototype, "nested", void 0);
tslib_1.__decorate([
    decorators_1.prop({ ref: tesRef_1.TesRef }),
    tslib_1.__metadata("design:type", Object)
], Test.prototype, "testRef", void 0);
tslib_1.__decorate([
    decorators_1.prop([{ ref: tesRef_1.TesRef }]),
    tslib_1.__metadata("design:type", Object)
], Test.prototype, "testRefArr", void 0);
tslib_1.__decorate([
    decorators_1.virtual(),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], Test.prototype, "setName", null);
tslib_1.__decorate([
    decorators_1.method(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Test.prototype, "setName2", null);
tslib_1.__decorate([
    decorators_1.pre("save"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Test.prototype, "preSave", null);
tslib_1.__decorate([
    decorators_1.staticMethod(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Test, "setName3", null);
Test = tslib_1.__decorate([
    decorators_1.schema("Test", { strict: true })
], Test);
exports.Test = Test;
//# sourceMappingURL=test.js.map