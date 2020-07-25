import { v4 as uuidv4 } from "uuid";
import Track from "./Track";

export default class Mixer {
    constructor({ tracks = [] } = {}) {
        this.id = uuidv4();

        this.tracks = new Set(tracks);
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

    newTrack({ fps, frames = [], tw = 128, th = 128 } = {}) {
        this.add(new Track({ fps, frames, tw, th }));

        return this;
    }

    add(track) {
        this.tracks.add(track);

        return this;
    }
    remove(track) {
        this.tracks.delete(track);

        return this;
    }

    reorder(index, newIndex) {
        let tracks = [ ...this.tracks ];
        const [ track ] = tracks.splice(index, 1) || [];

        if(track) {
            tracks.splice(newIndex, 0, track);

            this.tracks = new Set(tracks);
        }

        return this;
    }
    swap(i0, i1) {
        let tracks = [ ...this.tracks ];

        const t0 = tracks[ i0 ];
        const t1 = tracks[ i1 ];
        tracks[ i0 ] = t1;
        tracks[ i1 ] = t0;

        this.tracks = new Set(tracks);

        return this;
    }
};