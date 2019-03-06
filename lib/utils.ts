import _ = require('lodash');

export class Utils {
    public static enumValues(enm: any): string[] {
        let res = [];

        for (let key in enm) {

            let useValue = enm[key];

            if (!isNaN(key as any)) {
                useValue = +key;
            }

            if (res.indexOf(useValue) === -1 && res.indexOf(key) === -1) {
                res.push(useValue);
            }
        }

        return res;
    }

    public static getReflectData<T>(symbol: Symbol | string, klass, defaultValue?: T): T {
        let value = Reflect.getOwnMetadata(symbol, klass);

        if (!value && Reflect.hasMetadata(symbol, klass)) {
            value = _.cloneDeep(Reflect.getMetadata(symbol, klass));
            Reflect.defineMetadata(symbol, value, klass);
        }

        if (!value && defaultValue != undefined) {
            value = defaultValue;
            Reflect.defineMetadata(symbol, value, klass);
        }

        return value
    }
}

