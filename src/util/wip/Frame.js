import Base64 from "./../Base64";

export default class Frame {
    constructor({ duration = 1, source, rows = 1, cols = 1 } = {}) {
        this.duration = duration;   // Duration will be interpreted as seconds = (1 / duration) * fps
        this.resize(rows, cols);
        this.set(source, 0, 0);
    }

    dec(amount = 0) {
        this.duration += amount;

        return this;
    }
    inc(amount = 0) {
        this.duration -= amount;

        return this;
    }
    /**
     * Make the duration 1/2x of the current durration
     * @param {number} factor 
     */
    half(factor = 1) {
        this.duration *= (2 * factor);

        return this;
    }
    /**
     * Make the duration 2x of the current durration
     * @param {number} factor 
     */
    double(factor = 1) {
        this.duration /= (2 * factor);

        return this;
    }

    resize(rows = 1, cols = 1) {
        this.rows = Math.max(rows, 1);
        this.columns = Math.max(cols, 1);

        const oldSource = this.get(0, 0);
        this.canvas = [];
        for(let r = 0; r < this.rows; i++) {
            this.canvas.push([]);

            let current = this.canvas[ i ];
            for(let c = 0; c < this.columns; i++) {
                current.push(null);
            }
        }

        this.set(oldSource, 0, 0);
    }

    get(row = 0, col = 0) {
        return this.canvas[ row ][ col ];
    }
    set(source, row = 0, col = 0) {
        if(source) {
            if(source instanceof HTMLCanvasElement) {
                this.canvas[ row ][ col ] = source;
            } else {
                Base64.Decode(source).then(canvas => {
                    if(canvas instanceof HTMLCanvasElement) {
                        this.canvas[ row ][ col ] = canvas;
                    }
                });
            }
        }

        return this;
    }
    delete(row = 0, col = 0) {
        this.canvas[ row ][ col ] = null;

        return this;
    }

    swap(r0, c0, r1, c1) {
        const e0 = this.get(r0, c0);
        const e1 = this.get(r1, c1);

        this.set(e1, r0, c0);
        this.set(e0, r1, c1);

        return this;
    }

    static SwapBetweenFrames(f0, r0, c0, f1, r1, c1) {
        const e0 = f0.get(r0, c0);
        const e1 = f1.get(r1, c1);

        f0.set(e1, r0, c0);
        f1.set(e0, r1, c1);

        return this;
    }
};