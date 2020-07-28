import Type, { EnumType } from "./Type";

export default class TypeString extends Type {
    constructor(options, { meta = {} } = {}) {
        super(options, {
            type: EnumType.STRING,
            meta: meta,
            validator: (input) => {
                return typeof input === "string";
            }
        });
    }
};