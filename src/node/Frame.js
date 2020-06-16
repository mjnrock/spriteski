import Note from "./Note";

export default class Frame {
    constructor(row, index, duration, chord = [], tags = []) {
        this.row = row;
        this.index = index;
        this.duration = duration;
        this.chord = chord;
        this.tags = tags;
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

    addTag(...tags) {
        this.tags = [
            ...this.tags,
            ...tags
        ];

        return this;
    }
    removeTag(...tags) {
        this.tags = this.tags.filter(tag => !tags.includes(tag));

        return this;
    }

    addNote(x, y, base64) {
        this.chord.push(new Note(x, y, base64));

        return this;
    }
    removeNote(x, y) {
        this.chord = this.chord.filter(note => note.x !== x && note.y !== y);

        return this;
    }

    async toCanvas() {
        return await Base64.Decode(this.base64);
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
        
        const chord = (obj.chord || []).map(note => Note.FromJson(note));

        return new Frame(
            obj.row,
            obj.index,
            obj.duration,
            chord,
            obj.tags,
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
            && "chord" in obj
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