import EventEmitter from "events";

export const EnumEventType = {
    UPDATE: "Configuration.Update",
};

//TODO Expand this to utilize something similar to the PTO tags, but lighter weight
export default class Configuration extends EventEmitter {
    /**
     * @state expects { option: optionsKey, ... } construction
     */
    constructor({ options, defaultsByKey = {}, defaultsByValue = {} } = {}) {
        super();

        this.state = {};
        this.options = options;

        for(let option in this.options) {
            if(option in defaultsByKey) {
                this.setByKey(option, defaultsByKey[ option ], { suppress: true });
            } else if(option in defaultsByValue) {
                this.setByValue(option, defaultsByValue[ option ], { suppress: true });
            } else {
                this.state[ option ] = null;
            }
        }
    }

    isValid(option, key) {
        const entries = this.options[ option ] || [];

        if(entries.length) {
            const choice = entries.reduce((a, v, i) => {
                if(typeof v === "object" && (typeof key === "string" || key instanceof String)) {
                    return (v[ key ] !== void 0 ? v[ key ] : void 0) || a;
                }

                return (key === i ? v : void 0) || a;
            });

            if(choice !== void 0) {
                return true;
            }
        }

        return false;
    }

    has(option) {
        return !!this.state[ option ];
    }

    key(option) {
        const entry = this.state[ option ] || [];

        return entry[ 0 ];
    }
    value(option) {
        const entry = this.state[ option ] || [];

        return entry[ 1 ];
    }    
    current(option) {
        return this.state[ option ] || [];
    }

    setByKey(option, key, { suppress = false } = {}) {
        const entries = this.options[ option ] || [];

        if(entries.length) {
            const falsey = (value) => ({
                __value: value,
            });

            let choice = entries.reduce((a, v, i) => {
                if(typeof v === "object" && (typeof key === "string" || key instanceof String)) {
                    const entry = v[ key ];
                    if(entry === 0 || entry === false) {
                        return (entry !== void 0 ? falsey(entry) : void 0) || a;
                    }

                    return (entry !== void 0 ? entry : void 0) || a;
                }

                if(v === 0 || v === false) {
                    return (key === i ? falsey(v) : void 0) || a;
                }

                return (key === i ? v : void 0) || a;
            }, void 0);

            if(choice !== void 0) {
                const oldValue = this.state[ option ];

                if(typeof choice === "object" && "__value" in choice) {
                    choice = choice.__value;
                }

                this.state[ option ] = [ key, choice ];

                if(!suppress) {
                    this.emit(EnumEventType.UPDATE, {
                        previous: oldValue,
                        current: this.state[ option ],
                    });
                }

                return true;
            }
        }

        return false;
    }

    setByValue(option, value, { suppress = false } = {}) {
        const entries = this.options[ option ] || [];

        if(entries.length) {
            let key;
            const choice = entries.reduce((a, v, i) => {
                if(typeof v === "object") {
                    const k = Object.keys(v)[ 0 ];

                    if(v[ k ] === value) {
                        key = k;
    
                        return v[ k ];
                    }
                } else {
                    if(v === value) {
                        key = i;    
    
                        return v;
                    }
                }

                return a;
            }, void 0);

            if(choice !== void 0 && key !== void 0) {
                const oldValue = this.state[ option ];

                this.state[ option ] = [ key, choice ];

                if(!suppress) {
                    this.emit(EnumEventType.UPDATE, {
                        previous: oldValue,
                        current: this.state[ option ],
                    });
                }

                return true;
            }
        }

        return false;
    }
}