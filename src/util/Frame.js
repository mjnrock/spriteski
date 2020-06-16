import Chord from "./Chord";

export default class Frame {
    constructor(row, index, duration, note, { tags = [] } = {}) {
        this.row = row;
        this.index = index;
        this.duration = duration;
        // this.chord = new Chord(...notes);
        this.note = note;
        this.tags = new Set(tags);
    }

    addTag(...tags) {
        for(let tag of tags) {
            this.tags.add(tag);
        }

        return this;
    }
    removeTag(...tags) {
        for(let tag of tags) {
            this.tags.delete(tag);
        }

        return this;
    }

    swap(frame) {
        if(Frame.Conforms(frame)) {
            let row = this.row,
                index = this.index;
    
            this.row = frame.row;
            this.index = frame.index;
    
            frame.row = row;
            frame.index = index;

            return true;
        }

        return false;
    }

    toCanvas() {
        return this.note.toCanvas();
    }




    serialize() {
        return JSON.stringify(obj);
    }
    toObject() {
        return JSON.parse(JSON.stringify(this));
    }

    static Deserialize(json) {
        let obj = json;

        while(typeof obj === "string" || obj instanceof String) {
            obj = JSON.parse(json);
        }
        
        // const chord = Chord.Deserialize(obj.chord);
        const note = Note.Deserialize(obj.note);

        return new Frame(
            ~~obj.row,
            ~~obj.index,
            ~~obj.duration,
            // chord,
            note,
            {
                tags: Array.isArray(obj.tags) ? obj.tags : [],
            },
        );
    }

    static Conforms(obj) {
        if(obj instanceof Frame) {
            return true;
        } else if(typeof obj !== "object") {
            return false;
        }

        return "row" in obj
            && "index" in obj
            && "duration" in obj
            // && "chord" in obj
            && "note" in obj
            && "tags" in obj;
    }
    static JsonConforms(json) {
        let obj = json;

        while(typeof obj === "string" || obj instanceof String) {
            obj = JSON.parse(obj);
        }

        return Frame.Conforms(obj);
    }
};