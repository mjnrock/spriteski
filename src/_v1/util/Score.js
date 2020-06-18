import Sequence from "./Sequence";

//TODO Type 1: .run() sets the timestamp, and a .draw() retrieves the appropriate frame; a precalculated, "time difference array" determines which frame is appropriate based on the number of elapsed milliseconds ([ 200, 640, 350, 100, ... ])
//TODO Type 2: .run() creates a .setTimeout self-invoking version, with controls ("play", "pause", etc.)

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

        //TODO this.sequence MUST be bounced and printed to a private canvas at <Score> instantiation to relieve async issues and optimize calls
    }

    /**
     * @tile expects { x, y, width, height }
     */
    paint(canvas, { x, y, tile } = {}) {
        //? This is kind of pseudo-code at time of writing
        // if(canvas instanceof HTMLCanvasElement) {
        //     const ctx = canvas.getContext("2d");
        //     const frame = this.currentFrame;

        //     if(x !== void 0 && y !== void 0) {
        //         ctx.drawImage(frame, x, y);
        //     } else if(tile.x !== void 0 && tile.y !== void 0) {
        //         let cx = tile.x * tile.width,
        //             cy = tile.y * tile.height;
                    
        //         ctx.drawImage(frame, cx, cy);
        //     }
        // }
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