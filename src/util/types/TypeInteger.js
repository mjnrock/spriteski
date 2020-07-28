import Type, { EnumType } from "./Type";

export default class TypeInteger extends Type {
    constructor(options, { meta = {} } = {}) {
        super(options, {
            type: EnumType.INTEGER,
            meta: meta,
            validator: (input) => {
                return typeof input === "number" && /^([+-]?[1-9]\d*|0)$/.test(String(input));
            }
        });
    }
};