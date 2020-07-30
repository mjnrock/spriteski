import EventEmitter from "events";
import { v4 as uuidv4 } from "uuid";
import Base64 from "../Base64";
import Frame from "./Frame";

export const EnumEventType = {
    START: "Track.Start",
    STOP: "Track.Stop",
    NEXT: "Track.Next",
    PREVIOUS: "Track.Previous",
    MOVE: "Track.Reset",
}

export default class Track extends EventEmitter {
    constructor({ fps = 16, frames = [], tw = 128, th = 128 } = {}) {
        super();

        this.id = uuidv4();

        this.frames = new Map(frames);
        this.fps = fps;

        this.tile = {
            width: tw,
            height: th,
        };

        this.index = 0;
        this.timeout = null;
    }

    get spf() {
        return 1000 / this.fps;
    }

    get duration() {
        return [ ...this.frames.values() ].reduce((acc, frame) => acc + (this.fps * (1 / frame.duration)), 0) / this.fps * 1000;
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

    get(index) {
        return [ ...this.frames.values() ][ index ];
    }

    get selected() {
        return this.get(this.index);
    }
    next() {
        this.index = this.index + 1 >= this.frames.size ? 0 : this.index + 1;

        this.emit(EnumEventType.NEXT, this.index);

        return this;
    }
    previous() {
        this.index = this.index - 1 >= 0 ? this.index - 1 : this.frames.size - 1;

        this.emit(EnumEventType.PREVIOUS, this.index);

        return this;
    }
    move(index = 0) {
        this.index = index;

        this.emit(EnumEventType.MOVE, this.index);

        return this;
    }
    start() {
        this.stop();
        this.timeout = setTimeout(() => {
            this.next();
            this.start();
        }, 1000 * (this.selected.duration / this.fps));

        this.emit(EnumEventType.START);

        return this;
    }
    stop() {
        clearTimeout(this.timeout);
        this.timeout = null;

        this.emit(EnumEventType.STOP);

        return this;
    }

    add(input, duration) {
        if(input instanceof Frame) {
            this.frames.set(input.id, input);
        } else {
            Base64.Decode(input).then(canvas => {
                if(canvas instanceof HTMLCanvasElement) {
                    const frame = new Frame({
                        duration,
                        source: canvas.toDataURL(),
                    });

                    this.frames.set(frame.id, frame);
                }
            })
        }

        return this;
    }
    remove(input) {
        this.frames.delete(input);
    }

    reorder(index, newIndex) {
        let frames = [ ...this.frames.entries() ];
        const [ frame ] = frames.splice(index, 1) || [];

        if(frame) {
            frames.splice(newIndex, 0, frame);

            this.frames = new Map(frames);
        }

        return this;
    }
    swap(i0, i1) {
        let frames = [ ...this.frames.entries() ];

        const f0 = frames[ i0 ];
        const f1 = frames[ i1 ];
        frames[ i0 ] = f1;
        frames[ i1 ] = f0;

        this.frames = new Map(frames);

        return this;
    }

    getFrameById(id) {
        return [ ...this.frames.values() ].reduce((a, frame) => (frame.id === id ? frame : null) || a);
    }

    sendToTrack(frame, track, index) {
        if(frame instanceof Frame && track instanceof Track) {
            this.remove(frame.id);
            track.add(frame);

            if(typeof index === "number") {
                track.reorder(track.frames.size - 1, index);
            }
        }

        return this;
    }
};