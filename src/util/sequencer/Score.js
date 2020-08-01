import { v4 as uuidv4 } from "uuid";
import Mixer from "./Mixer";

export default class Score {
    constructor(mixer, { weight = 1 } = {}) {
        this.id = uuidv4();
        
        this.weight = weight;

        if(mixer instanceof Mixer) {
            mixer.toCanvas().then(canvas => this.canvas = canvas);
        }
    }

    static async Create(mixer, opts = {}) {
        if(mixer instanceof Mixer) {
            const mix = (new Score(null, opts));

            return mixer.toCanvas().then(canvas => {
                mix.canvas = canvas;

                return mix;
            });
        }
    }

    toImage(type = "image/png", quality = 1.0) {
        return this.canvas.toDataURL(type, quality);
    }
    toDataURL(...args) {
        return this.canvas.toDataURL(...args);
    }
};