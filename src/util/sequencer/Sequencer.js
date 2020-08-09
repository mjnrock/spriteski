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
                //  STUB    Manipulate data to create a tile hash map and a facing-track map, instead of this entire object
                score.data = data;

                resolve(score);
            });
        }));
    }
};