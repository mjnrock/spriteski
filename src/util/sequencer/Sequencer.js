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
                    let dur = 0;
                    directionHashMap.set(i * thetaStep, {
                        frames: track.frames.map(frame => {                            
                            dur += ((frame.duration / track.fps) * 1000);

                            const result = [ dur, { hash: frame.hash, duration: frame.duration, threshold: dur } ];

                            return result;
                        }),
                        fps: track.fps,
                        length: track.duration,
                    });

                    track.frames.forEach((frame, j) => {
                        tileHashMap.set(frame.hash, [ j, i ]);
                    });
                });

                score.data = {
                    frames: tileHashMap,
                    direction: directionHashMap,
                    step: thetaStep,
                    tile: data.tile,
                };

                //  STUB
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    score.drawTo(canvas, {
                        facing: 0,
                        elapsedTime: 0,
                        x: 0,
                        y: 0,
                    });
                    console.log(canvas.toDataURL())
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    score.drawTo(canvas, {
                        facing: 180,
                        elapsedTime: 0,
                        x: 0,
                        y: 0,
                    });
                    console.log(canvas.toDataURL())
                    console.log(canvas.width, canvas.height)

                    console.log(score.serialize())
                    Score.Deserialize(score.serialize()).then(data => console.log(data))

                resolve(score);
            });
        }));
    }
};