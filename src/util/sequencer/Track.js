import { v4 as uuidv4 } from "uuid";
import Base64 from "../Base64";
import Frame from "../sequencer/Frame";

export default class Track {
    constructor({ fps, frames = [], tw = 128, th = 128 } = {}) {
        this.id = uuidv4();

        this.frames = new Map(frames);
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
        return [ ...this.frames ].reduce((acc, frame) => acc + (this.fps * (1 / frame.duration)), 0) / this.fps * 1000;
    }

    get pixels() {
        return {
            width: this.frames.size * this.tile.width,
            height: this.tile.height,
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

    reorder(index, newIndex) {
        let frames = [ ...this.frames ];
        const [ frame ] = frames.splice(index, 1) || [];

        if(frame) {
            frames.splice(newIndex, 0, frame);

            this.frames = new Set(frames);
        }

        return this;
    }
    swap(i0, i1) {
        let frames = [ ...this.frames ];

        const f0 = frames[ i0 ];
        const f1 = frames[ i1 ];
        frames[ i0 ] = f1;
        frames[ i1 ] = f0;

        this.frames = new Set(frames);

        return this;
    }
};