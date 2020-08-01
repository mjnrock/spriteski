import { v4 as uuidv4 } from "uuid";
import Track from "./Track";
import Frame from "./Frame";
import Mixer from "./Mixer";
import Score from "./Score";
import TileCollection from "../TileCollection";

export default class Sequencer {
    constructor({ children, collection } = {}) {
        this.id = uuidv4();

        //TODO Sequence is instrinsically self-referencing; the Sequencer has children<Sequence|Mixer>[]
        //TODO Create getters/setters for taking a Mixer and abstracting it to other, say, angles (e.g. north Sequence converted to all angle Sequences, with getter(angle) => <Mixer>)
        this.children = children || new Mixer();
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
        return new Promise((resolve, reject) => Score.Create(this.children).then(score => resolve(score)));

        //TODO This should return a <Composition> with one-to-many <Score> as .children, get child(...args) => <Score> that is appropriate -- e.g. i = 0 as default, child(10) => <Score> that is bounced <...Mixer>
        //? Code below could be used as foundation after that refactor occurs
        //     const proms = [];

        //     for(let child of this.children) {
        //         if(child instanceof Mixer) {
        //             proms.push(new Promise((resolve, reject) => Score.Create(child).then(score => resolve(score))));
        //         } else if(child instanceof Sequencer) {
        //             proms.push(child.bake());
        //         }
        //     }

        //     const size = {
        //         width: 0,
        //         height: 0,
        //     };
        //     const current = {
        //         width: 0,
        //         height: 0,
        //     };

        //     return Promise.all(proms).then(canvases => {
        //         const cvs = document.createElement("canvas");
        //         const ctx = cvs.getContext("2d");

        //         for(let canvas of canvases) {
        //             size.width += canvas.width;
        //             size.height += canvas.height;
        //         }

        //         for(let canvas of canvases) {
        //             ctx.drawImage(canvas, current.width, current.height);

        //             current.width += canvas.width;
        //             current.height += canvas.height;
        //         }

        //         return cvs;
        //     });
    }
};