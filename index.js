"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
tslib_1.__exportStar(require("./lib/decorators"), exports);
const schema_1 = require("./lib/schema");
exports.Schema = schema_1.Schema;
const mongoose_1 = require("mongoose");
const ObjectId = mongoose_1.Types.ObjectId;
exports.ObjectId = ObjectId;
//# sourceMappingURL=index.js.map