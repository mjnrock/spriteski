// import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import Track from "./Track";
import Frame from "./Frame";
import Mixer from "./Mixer";
import Score from "./Score";
import TileCollection from "../TileCollection";

export default class Sequencer {
    constructor({ mixer, collection } = {}) {
        this.id = uuidv4();

        //TODO Create getters/setters for taking a Mixer and abstracting it to other, say, angles (e.g. north Sequence converted to all angle Sequences, with getter(angle) => <Mixer>)
        this.mixer = mixer || new Mixer();
        this.collection = collection || new TileCollection();

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

    async bake() {
        return new Promise((resolve, reject) => Score.Create(this.mixer).then(score => {
            this.mixer.toData().then(data => {
                const tileHashMap = new Map();
                const directionHashMap = new Map();
                const thetaStep = 360 / data.tracks.length;

                data.tracks.forEach((track, i) => {
                    directionHashMap.set(i * thetaStep, {
                        frames: new Map(track.frames.map(frame => [ frame.hash, { duration: frame.duration }])),
                        fps: track.fps,
                        length: track.duration,
                    });

                    track.frames.forEach((frame, j) => {
                        tileHashMap.set(frame.hash, [ j, i ]);
                    });
                });

                score.data = {
                    tile: tileHashMap,
                    direction: directionHashMap,
                };

                resolve(score);
            });
        }));
    }
};