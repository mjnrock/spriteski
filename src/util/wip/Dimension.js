import EventEmitter from "events";

export function initialize(cells, dimension, size, setter, depth = []) {
    if(!Array.isArray(cells)) {
        cells = [];
    }
    
    for(let i = 0; i < size; i++) {
        if(dimension - 1 > 0) {
            cells.push(initialize.call(this, cells[ i ], dimension - 1, size, setter, [ ...depth, i ]));
        } else {
            if(typeof setter === "function") {
                cells.push(setter.call(this, i, [ ...depth, i ], dimension, size, setter));
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

        initialize.call(this, this.cells, this.dimensionality, this.size, this.setter);
    }
    
    dive(dims, lengths, { accumulator, target, extractor } = {}) {
        if(!Array.isArray(accumulator)) {
            accumulator = [];
        }

        for(let i = dims[ 0 ]; i < dims[ 0 ] + lengths[ 0 ]; i++) {
            if(target) {
                if(typeof extractor === "function") {
                    accumulator.push(extractor.call(this, target[ i ]));
                } else {
                    accumulator.push(target[ i ]);
                }
            } else {
                accumulator.push(this.dive(dims.slice(1), lengths.slice(1), { accumulator: accumulator[ i ], target: this.cells[ i ], extractor }));
            }
        }

        return accumulator;
    }

    get(...coords) {
        let result = this.cells;

        for(let i of coords) {
            result = result[ i ];
        }

        return result;
    }
    set() {
        const args = [ ...arguments ];

        if(args.length === this.dimensionality + 1) {
            const value = args[ args.length - 1 ];
            
            let result = this.cells;

            for(let i of args.slice(0, arguments.length - 2)) {
                result = result[ i ];
            }

            result[ args[ args.length - 2 ] ] = value;
        }

        return this;
    }
    swap() {
        const args = [ ...arguments ];

        if(args.length % 2 === 0) {
            const left = args.slice(0, args.length / 2);
            const right = args.slice(args.length / 2);

            const c0 = this.get(...left);
            const c1 = this.get(...right);

            this.set(...left, c1);
            this.set(...right, c0);
        }

        return this;
    }
    clear() {
        this.set(...arguments, null);

        return this;
    }

    isEmpty() {
        const cell = this.get(...arguments);

        return cell === void 0 || cell === null;
    }

    range(coords = [], lengths = [], opts = {}) {
        if(typeof lengths === "number") {
            return this.dive(coords, coords.map(() => lengths, opts));
        }

        return this.dive(coords, lengths, opts);
    }
    all() {
        return this.cells;
    }
}