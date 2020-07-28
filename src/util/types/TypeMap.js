import Type, { EnumType } from "./Type";

export default class TypeMap extends Type {
    constructor(options, types = [], { meta = {} } = {}) {
        super(options, {
            type: EnumType.MAP,
            meta: {
                keyType: types[ 0 ],
                valueType: types[ 1 ],

                ...meta,
            },
            validator: (input) => {
                if(Array.isArray(input) && input.length === 2) {                    
                    return typeof input[ 0 ] === this.meta.keyType && typeof input[ 1 ] === this.meta.valueType;
                } else if(typeof input === "object") {
                    const [ key, value ] = Object.entries(input)[ 0 ];

                    return typeof key === this.meta.keyType && typeof value === this.meta.valueType;
                }

                return false;
            }
        });
    }
    
    //TODO  Use the native Map to replace this.options, and rework accessor functions to accommodate accordingly
    //* The useage should feel like an Object, but opaquely utilize Map under the hood
};