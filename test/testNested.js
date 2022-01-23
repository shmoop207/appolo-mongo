"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestNested = void 0;
const tslib_1 = require("tslib");
const testNestedDeep_1 = require("./testNestedDeep");
const decorators_1 = require("../lib/decorators");
let TestNested = class TestNested extends testNestedDeep_1.TestNestedDeep {
};
(0, tslib_1.__decorate)([
    (0, decorators_1.prop)({ type: String }),
    (0, tslib_1.__metadata)("design:type", String)
], TestNested.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, decorators_1.prop)(),
    (0, tslib_1.__metadata)("design:type", String)
], TestNested.prototype, "name2", void 0);
TestNested = (0, tslib_1.__decorate)([
    (0, decorators_1.schema)("TestNested", { strict: true })
], TestNested);
exports.TestNested = TestNested;
//# sourceMappingURL=testNested.js.map