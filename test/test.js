"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
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
(0, tslib_1.__decorate)([
    (0, decorators_1.prop)({ type: String }),
    (0, tslib_1.__metadata)("design:type", String)
], Test.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, decorators_1.prop)(),
    (0, tslib_1.__metadata)("design:type", String)
], Test.prototype, "name2", void 0);
(0, tslib_1.__decorate)([
    (0, decorators_1.prop)(testNested_1.TestNested),
    (0, tslib_1.__metadata)("design:type", testNested_1.TestNested)
], Test.prototype, "nested", void 0);
(0, tslib_1.__decorate)([
    (0, decorators_1.prop)({ ref: tesRef_1.TesRef }),
    (0, tslib_1.__metadata)("design:type", Object)
], Test.prototype, "testRef", void 0);
(0, tslib_1.__decorate)([
    (0, decorators_1.prop)([{ ref: tesRef_1.TesRef }]),
    (0, tslib_1.__metadata)("design:type", Array)
], Test.prototype, "testRefArr", void 0);
(0, tslib_1.__decorate)([
    (0, decorators_1.virtual)(),
    (0, tslib_1.__metadata)("design:type", Object),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], Test.prototype, "setName", null);
(0, tslib_1.__decorate)([
    (0, decorators_1.method)(),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], Test.prototype, "setName2", null);
(0, tslib_1.__decorate)([
    (0, decorators_1.pre)("save"),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], Test.prototype, "preSave", null);
(0, tslib_1.__decorate)([
    (0, decorators_1.staticMethod)(),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], Test, "setName3", null);
Test = (0, tslib_1.__decorate)([
    (0, decorators_1.schema)("Test", { strict: true })
], Test);
exports.Test = Test;
//# sourceMappingURL=test.js.map