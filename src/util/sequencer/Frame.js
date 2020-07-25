import { v4 as uuidv4 } from "uuid";

export default class Frame {
    constructor({ duration = 1, source } = {}) {
        this.id = uuidv4();
        
        this.source = source;
        this.duration = duration; 
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
};