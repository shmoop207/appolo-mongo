"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectId = exports.Schema = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
(0, tslib_1.__exportStar)(require("./lib/decorators"), exports);
const schema_1 = require("./lib/schema");
Object.defineProperty(exports, "Schema", { enumerable: true, get: function () { return schema_1.Schema; } });
const mongoose_1 = require("mongoose");
const ObjectId = mongoose_1.Types.ObjectId;
exports.ObjectId = ObjectId;
//# sourceMappingURL=index.js.map