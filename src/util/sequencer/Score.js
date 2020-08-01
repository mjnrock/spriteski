import { v4 as uuidv4 } from "uuid";
import Mixer from "./Mixer";

export default class Score {
    constructor(mixer, { weight = 1, canvas, bounds = {} } = {}) {
        this.id = uuidv4();
        
        this.weight = weight;
        this.bounds = bounds;

        if(canvas instanceof HTMLCanvasElement) {
            this._canvas = canvas;
        } else if(mixer instanceof Mixer) {
            mixer.toCanvas().then(canvas => this._canvas = canvas);
        }
    }

    get canvas() {
        if("x0" in this.bounds && "y0" in this.bounds && "x1" in this.bounds && "y1" in this.bounds) {
            return this._canvas.getImage(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
        }

        return this._canvas;
    }
    set canvas(canvas) {
        this._canvas = canvas;
    }
    
    static async Create(mixer, opts = {}) {
        if(mixer instanceof Mixer) {
            const mix = new Score(null, opts);

            return mixer.toCanvas().then(canvas => {
                mix.canvas = opts.canvas || canvas;

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