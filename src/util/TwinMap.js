//* This class in unreliable in cases where @entries will be Numbers, use as a proper Map
export default class TwinMap {
    constructor({ entries = [] } = {}) {
        this.entries = new Map();
        this.indexes = new WeakMap();

        for(let i = 0; i < entries.length; i++) {
            const entry = entries[ i ];

            this.entries.set(entry, i);
            this.indexes.set(i, entry);
        }
    }

    get size() {
        return this.entries.size;
    }
    get length() {
        return this.entries.size - 1;
    }

    get(input) {
        const entry = this.entries.get(input);
        const index = this.indexes.get(input);

        if(entry) {
            return entry;
        }

        return index;
    }
    set(index, frame) {
        this.entries.set(frame, index);
        this.indexes.set(index, frame);

        return this;
    }

    has(input) {
        return {
            entry: this.entries.get(input) !== void 0,
            index: this.indexes.get(input) !== void 0,
        };
    }

    delete(input) {
        const i = this.get(input);

        if(typeof i === "number") {
            this.entries.delete(input);
            this.indexes.delete(i);
        } else {
            this.entries.delete(i);
            this.indexes.delete(input);
        }

        return this;
    }

    add(input) {
        this.set(this.size, input);
    }

    swap(input0, input1) {
        const i0 = this.get(input0);
        const i1 = this.get(input1);

        if(typeof i0 === typeof i1) {
            if(typeof i0 === "number") {
                this.set(i1, input0);
                this.set(i0, input1);
            } else {
                this.set(input0, i1);
                this.set(input1, i0);
            }
        }
    }

    each(fn) {
        const acc = [];
        if(typeof fn === "function") {
            for(let [ entry, index ] of this.entries.entries()) {
                acc.push(fn.call(this, entry, index));
            }
        }

        return acc;
    }
};