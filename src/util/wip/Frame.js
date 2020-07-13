import Base64 from "./../Base64";

export default class Frame {
    constructor({ source, rows = 1, cols = 1 } = {}) {
        this.resize(rows, cols);
        this.set(0, 0, source);
    }

    resize(rows = 1, cols = 1) {
        this.rows = rows;
        this.columns = cols;

        this.canvas = [];
        for(let r = 0; r < this.rows; i++) {
            this.canvas.push([]);

            let current = this.canvas[ i ];
            for(let c = 0; c < this.columns; i++) {
                current.push(null);
            }
        }
    }

    get(row, col) {
        return this.canvas[ row ][ col ];
    }
    set(row, col, source) {
        Base64.Decode(source).then(canvas => {
            if(canvas instanceof HTMLCanvasElement) {
                this.canvas[ row ][ col ] = canvas;
            }
        });

        return this;
    }
    delete(row, col) {
        this.canvas[ row ][ col ] = null;

        return this;
    }

    swap(r0, c0, r1, c1) {
        const e0 = this.get(r0, c0);
        const e1 = this.get(r1, c1);

        this.canvas[ r0 ][ c0 ] = e1;
        this.canvas[ r1 ][ c1 ] = e0;

        return this;
    }
};