"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const _ = require("lodash");
class Utils {
    static enumValues(enm) {
        let res = [];
        for (let key in enm) {
            let useValue = enm[key];
            if (!isNaN(key)) {
                useValue = +key;
            }
            if (res.indexOf(useValue) === -1 && res.indexOf(key) === -1) {
                res.push(useValue);
            }
        }
        return res;
    }
    static getReflectData(symbol, klass, defaultValue) {
        let value = Reflect.getOwnMetadata(symbol, klass);
        if (!value && Reflect.hasMetadata(symbol, klass)) {
            value = _.cloneDeep(Reflect.getMetadata(symbol, klass));
            Reflect.defineMetadata(symbol, value, klass);
        }
        if (!value && defaultValue != undefined) {
            value = defaultValue;
            Reflect.defineMetadata(symbol, value, klass);
        }
        return value;
    }
}
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map