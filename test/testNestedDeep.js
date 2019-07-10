"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const schema_1 = require("../lib/schema");
const decorators_1 = require("../lib/decorators");
let TestNestedDeep = class TestNestedDeep extends schema_1.Schema {
};
tslib_1.__decorate([
    decorators_1.prop({ type: String }),
    tslib_1.__metadata("design:type", String)
], TestNestedDeep.prototype, "deep", void 0);
tslib_1.__decorate([
    decorators_1.prop({ type: String }),
    tslib_1.__metadata("design:type", Array)
], TestNestedDeep.prototype, "deepArray", void 0);
TestNestedDeep = tslib_1.__decorate([
    decorators_1.schema("TestNestedDeep", { strict: true })
], TestNestedDeep);
exports.TestNestedDeep = TestNestedDeep;
//# sourceMappingURL=testNestedDeep.js.map