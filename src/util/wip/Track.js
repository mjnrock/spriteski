import { v4 as uuidv4 } from "uuid";
import Base64 from "../Base64";
import TwinMap from "./../TwinMap";
import Frame from "../sequencer/Frame";

export default class Track {
    constructor({ fps, frames = [], tw = 128, th = 128 } = {}) {
        this.id = uuidv4();

        this.frames = new TwinMap(frames);
        this.fps = fps;

        this.tile = {
            width: tw,
            height: th,
        };
    }

    get spf() {
        return 1000 / this.fps;
    }

    get duration() {
        return this.frames.reduce((acc, frame) => acc + (this.fps * (1 / frame.duration)), 0) / this.fps * 1000;
    }

    get pixels() {
        const obj = {
            frame: {
                width: (this.frames.get(0).columns * this.tile.width),
                height: (this.frames.get(0).rows * this.tile.height),
            }
        };

        return {
            ...obj,
            width: this.frames.size * frame.width,
            height: frame.height,
        };
    }

    resize(tw = 128, th = 128) {
        this.tile.width = tw;
        this.tile.height = th;
    }

    add(input, duration) {
        if(input instanceof Frame) {
            this.frames.set(this.frames.size, input);
        } else {
            Base64.Decode(input).then(canvas => {
                if(canvas instanceof HTMLCanvasElement) {
                    this.frames.set(this.frames.size, new Frame({
                        duration,
                        source: canvas,
                    }));
                }
            })
        }

        return this;
    }
    remove(input) {
        this.frames.delete(input);
    }
    swap(input0, input1) {
        this.frames.swap(input0, input1);

        return this;
    }
};