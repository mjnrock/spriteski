import Type, { EnumType } from "./Type";

export default class TypeBoolean extends Type {
    constructor(options, { meta = {} } = {}) {
        super(options, {
            type: EnumType.BOOLEAN,
            meta: meta,
            validator: (input) => {
                return typeof input === "boolean";
            }
        });
    }
};