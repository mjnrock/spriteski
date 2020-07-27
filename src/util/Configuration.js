import EventEmitter from "events";

export const EnumEventType = {
    UPDATE: "Configuration.Update",
};

//TODO Expand this to utilize something similar to the PTO tags, but lighter weight
export default class Configuration extends EventEmitter {
    /**
     * @state expects { option: optionsKey, ... } construction
     */
    constructor({ options, state = {} } = {}) {
        super();

        this.state = {};
        this.options = options;

        for(let option in this.options) {
            if(option in state) {
                this.set(option, state[ option ], { suppress: true });
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

    set(option, key, { suppress = false } = {}) {
        const entries = this.options[ option ] || [];

        if(entries.length) {
            //TODO This shorthand doesn't work on Booleans, and probably all implicit booleans
            const choice = entries.reduce((a, v, i) => {
                console.log(option, key, i, key === i, v)
                if(typeof v === "object" && (typeof key === "string" || key instanceof String)) {
                    return (v[ key ] !== void 0 ? v[ key ] : void 0) || a;
                }

                return (key === i ? v : void 0) || a;
            }, void 0);

            if(choice !== void 0) {
                const oldValue = this.state[ option ];

                this.state[ option ] = [ key, choice ];

                if(!suppress) {
                    this.emit(EnumEventType.UPDATE, {
                        previous: oldValue,
                        current: this.state[ option ],
                    });
                }
            }
        }

        return this;
    }
}