import Frame from "./Frame";

export default class Sequence {
    constructor(fps, frames = [], tags = []) {
        this.fps = fps;
        this.frames = frames;
        this.tags = tags;
    }

    normalizePositions() {
        let rows = {};

        this.frames.forEach(frame => {
            if(!Array.isArray(rows[ frame.row ])) {
                rows[ frame.row ] = [];
            }

            row[ frame.row ].push(frame);
        });

        Object.entries(rows).forEach((row, i) => {
            row.sort((a, b) => a.index - b.index);
            row.forEach(frame => frame.index = i);
        });

        return this;
    }

    addFrame(frame) {
        if(Frame.Conforms(frame)) {
            this.frames.push(frame);
        } else if(arguments.length >= 3 && arguments.length <= 5) {
            const newFrame = new Frame(...arguments);
            
            this.frames.push(newFrame);
        }
        this.normalizePositions();

        return this;
    }
    removeFrame(row, index) {
        this.frames = this.frames.filter(frame => frame.row !== row && frame.index !== index);
        this.normalizePositions();

        return this;
    }


    toJson() {
        return JSON.stringify(this);
    }
    toObject() {
        return JSON.parse(JSON.stringify(this));
    }

    static FromJson(json) {
        let obj = json;

        while(typeof obj === "string" || obj instanceof String) {
            obj = JSON.parse(json);
        }

        const frames = (obj.frames || []).map(frame => Frame.FromJson(frame));

        return new Frame(
            obj.fps,
            frames,
            obj.tags,
        );
    }

    static Conforms(obj) {
        if(obj instanceof Sequence) {
            return true;
        } else if(typeof obj !== "object") {
            return false;
        }

        return "fps" in obj
            && "frames" in obj
            && "tags" in obj;
    }
    static JsonConforms(json) {
        let obj = json;

        while(typeof obj === "string" || obj instanceof String) {
            obj = JSON.parse(obj);
        }

        return Sequence.Conforms(obj);
    }
};