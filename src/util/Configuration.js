import EventEmitter from "events";

export const EnumEventType = {
    UPDATE: "Configuration.Update",
};

/**
 * ! A basic assumption of this class is that ALL Options should be ONLY [] or {}, as any normal situation should have more than 1 choice
 * If a configuration setting only has 1 option, wrap it in an array (e.g. 1 = [ 1 ])
 * [] will be treated as singular entry systems (i.e. key = index, value = arr[ index ])
 * {} will be trated as key-value pair systems (i.e. key = key, value = obj[ key ])
 */
export default class Configuration extends EventEmitter {
    constructor(options, { state = {}, defaultsByKey = {}, defaultsByValue = {} } = {}) {
        super();

        this.state = state;
        this.options = options;

        if(!Object.keys(state).length) {
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
    }

    isValidKey(option, key) {
        let entries = this.options[ option ];

        if(entries) {
            const falsey = (value) => ({
                __value: value,
            });

            let choice;
            if(!Array.isArray(entries) && typeof entries === "object") {
                choice = entries[ key ];
            } else {
                choice = entries.reduce((a, v, i) => {
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
            }

            if(choice !== void 0) {
                return true;
            }
        }

        return false;
    }
    isValidValue(option, value) {
        let entries = this.options[ option ];

        if(entries) {
            if(!Array.isArray(entries) && typeof entries === "object") {
                entries = Object.entries(entries).map(([ k, v ]) => ({
                    [ k ]: v,
                }));
            }
            
            let key;
            let choice = entries.reduce((a, v, i) => {
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

    choices(option) {
        return this.options[ option ];
    }
    first(option) {
        const entry = this.options[ option ];

        if(Array.isArray(entry)) {
            return entry[ 0 ];
        } else if(typeof entry === "object") {
            return Object.entries(entry)[ 0 ];
        }
    }
    last(option) {
        const entry = this.options[ option ];

        if(Array.isArray(entry)) {
            return entry[ entry.length - 1 ];
        } else if(typeof entry === "object") {
            return Object.entries(entry)[ entry.length - 1 ];
        }
    }

    set(method, option, input, { suppress = false } = {}) {
        if(method === "key") {
            return this.setByKey(option, input, { suppress });
        } else if(method === "value") {
            return this.setByValue(option, input, { suppress });
        }

        return false;
    }
    setByKey(option, key, { suppress = false } = {}) {
        let entries = this.options[ option ];

        if(entries) {
            const falsey = (value) => ({
                __value: value,
            });

            let choice;
            if(!Array.isArray(entries) && typeof entries === "object") {
                choice = entries[ key ];
            } else {
                choice = entries.reduce((a, v, i) => {
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
            }

            if(choice !== void 0) {
                const oldValue = this.state[ option ];

                if(typeof choice === "object" && "__value" in choice) {
                    choice = choice.__value;
                }

                this.state[ option ] = [ key, choice ];

                if(!suppress) {
                    this.emit(EnumEventType.UPDATE, {
                        method: "key",
                        args: [ ...arguments ],
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
        let entries = this.options[ option ];

        if(entries) {
            if(!Array.isArray(entries) && typeof entries === "object") {
                entries = Object.entries(entries).map(([ k, v ]) => ({
                    [ k ]: v,
                }));
            }
            
            let key;
            let choice = entries.reduce((a, v, i) => {
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
                        method: "value",
                        args: [ ...arguments ],
                        previous: oldValue,
                        current: this.state[ option ],
                    });
                }

                return true;
            }
        }

        return false;
    }



    toObject() {
        return JSON.parse(JSON.stringify(this));
    }
    toJson(beautify = false) {
        if(beautify === true) {
            return JSON.stringify(this, null, 2);
        }

        return JSON.stringify(this);
    }

    static FromJson(json) {
        let obj = json;

        while(typeof obj === "string" || obj instanceof String) {
            obj = JSON.parse(obj);
        }

        return new Configuration(obj.options, {
            state: obj.state,
        });
    }

    toData({ flag = "both" } = {}) {
        if(flag === "both") {
            return this.state;
        }

        let obj = {};

        for(let option in this.state) {
            if(flag === "keys") {
                obj[ option ] = this.state[ option ][ 0 ];
            } else {
                obj[ option ] = this.state[ option ][ 1 ];
            }
        }

        return obj;
    }
    toKeys() {
        return this.toData({ flag: "keys" });
    }
    toValues() {
        return this.toData({ flag: "values" });
    }
}