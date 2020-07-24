import EventEmitter from "events";

export function recurse(cells, dimension, size, setter, depth = []) {
    if(!Array.isArray(cells)) {
        cells = [];
    }
    
    for(let i = 0; i < size; i++) {
        if(dimension - 1 > 0) {
            cells.push(recurse(cells[ i ], dimension - 1, size, setter, [ ...depth, i ]));
        } else {
            if(typeof setter === "function") {
                cells.push(setter(i, [ ...depth, i ], dimension, size, setter));
            } else {
                cells.push(null);
            }
        }
    }

    return cells;
}

export default class Dimension extends EventEmitter {
    constructor({ dimensionality = 2, size, setter } = {}) {
        super();
        
        this.dimensionality = dimensionality;
        this.size = size;

        this.setter = setter;
        this.cells = [];

        recurse(this.cells, this.dimensionality, this.size, this.setter);
    }

    get(...coords) {
        let result = this.cells;

        for(let i of coords) {
            result = result[ i ];
        }

        return result;
    }
    set(value, ...coords) {
        if(Array.isArray(coords) && coords.length === this.dimensionality) {
            let result = this.cells;

            for(let i of coords.slice(0, coords.length - 1)) {
                result = result[ i ];
            }

            result[ coords[ coords.length - 1 ] ] = value;
        }

        return this;
    }

    // range(coords = [], lengths = []) {
    //     if(typeof lengths === "number") {

    //     }
    // }
    all() {
        return this.cells;
    }
}