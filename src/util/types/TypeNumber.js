import Type, { EnumType } from "./Type";

export default class TypeNumber extends Type {
    constructor(options, { meta = {} } = {}) {
        super(options, {
            type: EnumType.NUMBER,
            meta: meta,
            validator: (input) => {
                return typeof input === "number";
            }
        });
    }
};