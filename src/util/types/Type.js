export const EnumType = {
    GENERIC: 0,
    BOOLEAN: 1,
    INTEGER: 2,
    NUMBER: 3,
    STRING: 4,
    MAP: 4,
};

export default class Type {
    constructor(options = [], { type, validator, meta = {} } = {}) {
        this.options = options;
        this.meta = {
            type: type,
            inclusive: false,

            ...meta,
        };

        this.validator = validator;
    }

    get isInclusive() {
        return this.meta.inclusive;
    }

    check(input) {
        if(Array.isArray(this.options)) {
            if(this.options.length) {
                return this.options.includes(input);
            } else if(typeof this.validator === "function") {
                return this.validator(input);
            }
        } else if(typeof this.options === "object") {
            if(input in this.options) {
                return true;
            } else if(typeof this.validator === "function") {
                return this.validator(input);
            }
        }

        return false;
    }

    get(...keys) {
        if(keys.length === 1) {
            return this.options[ keys[ 0 ] ];
        }

        let arr = [];
        for(let key of keys) {
            const opt = this.options[ key ];

            if(opt !== void 0) {
                arr.push(opt);
            }
        }

        return arr;
    }
    has(...keys) {
        if(keys.length === 1) {
            return keys[ 0 ] in this.options;
        }

        let arr = [];
        for(let key of keys) {
            arr.push(key in this.options);
        }

        return arr.every(v => v === true);
    }
    set(options = []) {
        let opts = options;
        if(typeof this.validator === "function" ) {
            if(Array.isArray(options)) {
                opts = options.filter((opt, i) => this.validator(opt, i) === true);
            } else if(typeof options === "object") {
                let temp = Object.entries(options).filter(([ key, opt ]) => this.validator(opt, key) === true);
                opts = {};

                for(let [ k, v ] of temp) {
                    opts[ k ] = v;
                }
            }
        }

        this.options = opts;

        return this;
    }
    add(option, key) {
        if(typeof this.validator === "function" ) {
            if(this.validator(option) !== true) {
                return false;
            }
        }

        if(key !== void 0) {
            if(Array.isArray(this.options)) {
                this.options.splice(key, 0, option);
                
                return true;
            } else if(typeof this.options === "object") {
                this.options[ key ] = option;
                
                return true;
            }
        } else {
            if(Array.isArray(this.options)) {
                this.options.push(option);
                
                return true;
            }
        }
                
        return false;
    }
}