// import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import Track from "./Track";
import Frame from "./Frame";
import Mixer from "./Mixer";
import Score from "./Score";
import TileCollection from "../TileCollection";

export default class Sequencer {
    constructor({ mixer, collection, name } = {}) {
        this.id = uuidv4();
        this.name = name;

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

    rename(name) {
        this.name = name;
    }

    async bake() {
        return new Promise((resolve, reject) => Score.Create(this.mixer).then(score => {
            this.mixer.toData().then(data => {
                const tileHashMap = new Map();
                const directionHashMap = new Map();
                const thetaStep = 360 / data.tracks.length;

                let maxLength = 0;
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

                    maxLength = Math.max(maxLength, track.duration);

                    track.frames.forEach((frame, j) => {
                        tileHashMap.set(frame.hash, [ j, i ]);
                    });
                });

                score.data = {
                    frames: tileHashMap,
                    direction: directionHashMap,
                    step: thetaStep,
                    tile: data.tile,
                    duration: maxLength,
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
                    
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    score.drawTo(canvas, {
                        facing: 180,
                        elapsedTime: 0,
                        x: 0,
                        y: 0,
                    });

                    const encoded = "data:text/json;charset=utf-8," + encodeURIComponent(score.serialize());
                    const ele = document.createElement("a");
                    let name = String(this.name || Date.now());
                    
                    ele.setAttribute("href", encoded);
                    ele.setAttribute("download", `${ name.trim() }.json`);
                    ele.click();

                resolve(score);
            });
        }));
    }
};