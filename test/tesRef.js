"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const decorators_1 = require("../lib/decorators");
const schema_1 = require("../lib/schema");
var Test;
(function (Test) {
    Test["A"] = "aaa";
    Test[Test["B"] = 1] = "B";
    Test[Test["F"] = 2] = "F";
    Test["C"] = "11";
    Test["D"] = "111";
})(Test || (Test = {}));
let TesRef = class TesRef extends schema_1.Schema {
};
tslib_1.__decorate([
    decorators_1.prop({ type: String, enum: Test })
], TesRef.prototype, "bla", void 0);
TesRef = tslib_1.__decorate([
    decorators_1.schema("TesRef", { strict: true }),
    decorators_1.index({ bla: 1 }, { unique: true })
], TesRef);
exports.TesRef = TesRef;
//# sourceMappingURL=tesRef.js.map