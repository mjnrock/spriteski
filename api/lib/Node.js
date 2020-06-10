import EventEmitter from "events";
import { v4 as uuidv4 } from "uuid";

import { freeze, freezeCopy } from "./functions";

export const EnumEventType = {
    MESSAGE: "message",
};

export default class Node extends EventEmitter {
    constructor(state = {}) {
        super();

        this.id = uuidv4();
        this._state = freeze(state);
        this._reducers = [];
        this._config = {
            isSelfMessaging: true
        };

        this.on(EnumEventType.MESSAGE, this.receive.bind(this));
    }

    get state() {
        return this._state;
    }
    get config() {
        return this._config;
    }

    flagOn(configEntry) {
        if(configEntry in this._config) {
            this._config[ configEntry ] = true;
        }

        return this;
    }
    flagOff(configEntry) {
        if(configEntry in this._config) {
            this._config[ configEntry ] = false;
        }

        return this;
    }
    flagToggle(configEntry) {
        if(configEntry in this._config) {
            this._config[ configEntry ] = !this._config[ configEntry ];
        }

        return this;
    }

    send(type, payload) {
        this.emit(EnumEventType.MESSAGE, freezeCopy({
            id: uuidv4(),
            type: type,
            payload: payload,
            timestamp: Date.now(),
            emitter: this
        }));
    }
    receive(msg) {
        if((this.config.isSelfMessaging && msg.emitter.id === this.id) || msg.emitter.id !== this.id) {            
            if(typeof this.before === "function") {
                this.before(msg, this);
            }

            for(let reducer of this._reducers) {
                if(typeof reducer === "function") {
                    let newState = reducer.call(this, this._state, msg) || this.state;

                    if(!(typeof newState === "object" || Array.isArray(newState))) {
                        newState = [ newState ];
                    }

                    this._state = freeze(newState);
                }
            }
            
            if(typeof this.after === "function") {
                this.after(msg, this);
            }
        }
    }

    addReducer() {
        if(arguments.length === 1) {
            const [ reducer ] = arguments;

            if(typeof reducer === "function") {
                this._reducers.push(reducer);
            }
        } else if(arguments.length === 2) {
            const [ type, reducer ] = arguments;
            
            if(typeof reducer === "function") {
                this._reducers.push(function(state, msg) {
                    if(msg.type === type) {
                        return reducer(state, msg);
                    }

                    return state;
                });
            }
        }

        return this;
    }
    clearReducers() {
        this._reducers = [];

        return this;
    }

    track(node, twoWay = false) {
        if(node instanceof EventEmitter) {
            node.on(EnumEventType.MESSAGE, this.receive.bind(this));

            if(twoWay) {
                this.on(EnumEventType.MESSAGE, node.receive.bind(node));
            }
        }

        return this;
    }
    untrack(node, twoWay = false) {
        if(node instanceof EventEmitter) {
            node.off(EnumEventType.MESSAGE, this.receive.bind(this));

            if(twoWay) {
                this.off(EnumEventType.MESSAGE, node.receive.bind(node));
            }
        }

        return this;
    }

    flatten() {
        const recurse = (state, ancestry = []) => {
            const arr = [];

            for(let key in state) {
                let element = state[ key ];

                if(typeof element === "object" && !Array.isArray(element)) {
                    arr.push(...recurse(element, [ ...ancestry, key ]));
                } else {
                    arr.push([
                        [ ...ancestry, key ].join("."),
                        element
                    ]);
                }
            }

            return arr;
        };

        return recurse(this.state, []);
    }
    unflatten(input) {
        let state = {};

        for(let [ key, value ] of input) {
            if(key.includes(".")) {
                let ancestry = key.split(".");
                let obj = state,
                    pointer = obj;

                for(let i = 0; i < ancestry.length; i++) {
                    let k = ancestry[ i ];

                    if(!pointer[ k ]) {
                        pointer[ k ] = {};
                    }

                    if(i < ancestry.length - 1) {
                        pointer = pointer[ k ];
                    }
                }

                pointer[ ancestry[ ancestry.length - 1] ] = value;
                
                state = {
                    ...state,
                    ...obj
                };
            } else {
                state[ key ] = value;
            }
        }

        this._state = state;

        return this.state;
    }
};