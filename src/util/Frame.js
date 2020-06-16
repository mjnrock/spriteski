import Note from "./Note";

export default class Frame {
    constructor(row, index, duration, chord = [], { tags = [] } = {}) {
        this.row = row;
        this.index = index;
        this.duration = duration;
        this.chord = chord;
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

    addNote(x, y, base64) {
        this.chord.push(new Note(x, y, base64));

        return this;
    }
    removeNote(x, y) {
        this.chord = this.chord.filter(note => note.x !== x && note.y !== y);

        return this;
    }

    /* TODO ALlow this to expand to multi-Note chords, instead of just 0,0
     * |---|---|---|    |---------|
     * |---|-x-|---| -> |----x----|
     * |---|---|---|    |---------|
     */
    toCanvas() {
        if(this.chord.length) {
            const [ note ] = this.chord.filter(note => note.x === 0 && note.y === 0);

            if(note instanceof Note) {
                return note.toCanvas();
            }
        }

        return false;
    }




    toJson() {
        return JSON.stringify(obj);
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
            ~~obj.row,
            ~~obj.index,
            ~~obj.duration,
            chord,
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