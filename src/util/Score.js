import Sequence from "./Sequence";

export default class Score {
    constructor(sequence) {
        if(sequence instanceof Sequence) {
            this.sequence = sequence;
        } else if(Sequence.JsonConforms(sequence)) {
            this.sequence = Sequence.Deserialize(sequence);
        } else {
            throw new Error("Score must be given a <Sequence>");
        }

        this._isRunning = false;
        this._index = 0;
    }

    get maxIndex() {
        return this.sequence.frames.length - 1;
    }

    reset() {
        this._index = 0;
        this._isRunning = false;
    }

    play() {
        if(!this._isRunning) {
            this._isRunning = true;
        }
    }
    pause() {
        this._isRunning = false;
    }
}