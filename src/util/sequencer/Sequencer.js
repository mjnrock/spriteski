import { v4 as uuidv4 } from "uuid";
import Track from "./Track";
import Frame from "./Frame";

export default class Sequencer {
    constructor({ mixer, collection } = {}) {
        this.id = uuidv4();

        this.mixer = mixer;
        this.collection = collection;

        this.active = {
            track: null,
            frame: null,
        };
    }

    get track() {
        return this.active.track;
    }
    set track(track) {
        if(track instanceof Track) {
            this.active.track = track;
        }
    }
    get frame() {
        return this.active.frame;
    }
    set frame(frame) {
        if(frame instanceof Frame) {
            this.active.frame = frame;
        }
    }
};