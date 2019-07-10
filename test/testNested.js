"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const testNestedDeep_1 = require("./testNestedDeep");
const decorators_1 = require("../lib/decorators");
let TestNested = class TestNested extends testNestedDeep_1.TestNestedDeep {
};
tslib_1.__decorate([
    decorators_1.prop({ type: String }),
    tslib_1.__metadata("design:type", String)
], TestNested.prototype, "name", void 0);
tslib_1.__decorate([
    decorators_1.prop(),
    tslib_1.__metadata("design:type", String)
], TestNested.prototype, "name2", void 0);
TestNested = tslib_1.__decorate([
    decorators_1.schema("TestNested", { strict: true })
], TestNested);
exports.TestNested = TestNested;
//# sourceMappingURL=testNested.js.map