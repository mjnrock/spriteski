import TwinMap from "../TwinMap";
import Track from "./Track";

export default class Mixer {
    constructor({ tracks = [], weights = [] } = {}) {
        this.tracks = new TwinMap(tracks);
        this.weights = new Map();

        if(tracks.length && weights.length && tracks.length === weights.length) {
            for(let i = 0; i < tracks.length; i++ ) {
                const track = tracks[ i ];
                const weight = weights[ i ];

                this.weights.set(track, weight);
            }
        } else {
            throw new Error("Every track must has a weight, if you use weights.");
        }
    }

    add(track, weight = 1) {
        this.tracks.add(track);
        this.weights.set(track, weight);

        return this;
    }
    remove(input) {
        this.tracks.delete(input);

        const trackOrIndex = this.tracks.get(input);
        if(trackOrIndex instanceof Track) {
            this.weights.delete(trackOrIndex);

            return true;
        } else if(input instanceof Track) {
            this.weights.delete(input);

            return true;
        };

        return false;
    }
    swap(input0, input1) {
        this.tracks.swap(input0, input1);

        return this;
    }

    reweigh(input, weight) {
        if(typeof input === "function") {
            for(let [ track, lbs ] of this.weights.entries()) {
                const newWeight = Number.parseInt(fn(track, lbs, ~~weight));

                this.weights.set(track, Math.max(newWeight, 1));
            }

            return true;
        } else {
            const trackOrIndex = this.tracks.get(input);
    
            if(input instanceof Track) {
                this.weights.set(input, ~~weight);
    
                return true;
            } else if(trackOrIndex instanceof Track) {
                this.weights.set(trackOrIndex, ~~weight);
    
                return true;
            }
        }

        return false;
    }
};