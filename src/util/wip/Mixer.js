import { v4 as uuidv4 } from "uuid";
import TwinMap from "../TwinMap";

export default class Mixer {
    constructor({ tracks = [] } = {}) {
        this.id = uuidv4();

        this.tracks = new TwinMap(tracks);
    }

    get pixels() {
        let width = 0,
            height = 0,
            trackWidth = 0,
            trackHeight = 0;

        this.tracks.each(track => {
            width = Math.max(width, track.pixels.width);
            height += track.pixels.height;

            trackWidth = Math.max(track.pixels.width, trackWidth);
            trackHeight = Math.max(track.pixels.height, trackHeight);
        });

        return {
            width,
            height,
            
            track: {
                width: trackWidth,
                height: trackHeight,
            }
        };
    }

    add(track) {
        this.tracks.add(track);

        return this;
    }
    remove(input) {
        this.tracks.delete(input);
    }
    swap(input0, input1) {
        this.tracks.swap(input0, input1);

        return this;
    }
};