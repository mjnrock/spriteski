import { v4 as uuidv4 } from "uuid";
import Mixer from "./Mixer";

export default class Score {
    constructor(mixer, { weight = 1, canvas, bounds = {}, data = {}} = {}) {
        this.id = uuidv4();
        
        this.weight = weight;
        this.bounds = bounds;
        this.data = data;

        if(canvas instanceof HTMLCanvasElement) {
            this.canvas = canvas;
        } else if(mixer instanceof Mixer) {
            mixer.toCanvas().then(canvas => this.canvas = canvas);
        }

        if(mixer instanceof Mixer && Object.keys(data).length) {            
            mixer.toData().then(data => this.data = data);
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
    
    setBounds(x, y, w, h) {
        this.bounds = {
            x: x !== void 0 ? x : this.bounds.x,
            y: y !== void 0 ? y : this.bounds.y,
            w: w !== void 0 ? w : this.bounds.w,
            h: h !== void 0 ? h : this.bounds.h,
        };

        return this;
    }

    static async Create(mixer, opts = {}) {
        if(mixer instanceof Mixer) {
            const score = new Score(null, opts);

            return mixer.toCanvas().then(canvas => {
                score.canvas = opts.canvas || canvas;

                return score;
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