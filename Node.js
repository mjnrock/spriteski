import EventEmitter from "events";

export default class Node extends EventEmitter {
    constructor(state = {}) {
        super();

        this._state = state;
    }

    get state() {
        return this._state;
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