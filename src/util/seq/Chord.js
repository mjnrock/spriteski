import Note from "./Note";

export default class Chord {
    constructor(note) {
        this.note = note;
    }

    addNote(note) {
        if(note instanceof Note) {
            this.note = note;
        } else if(arguments.length === 3) {
            this.note = new Note(x, y, base64);
        }

        return this;
    }
    removeNote() {
        this.note = null;

        return this;
    }

    /* TODO ALlow this to expand to multi-Note chords, instead of just 0,0
     * |---|---|---|
     * |---|-x-|---| => |-x-|
     * |---|---|---|
     */
    toCanvas() {
        if(this.note) {
            return this.note.toCanvas();
        }

        return false;
    }



    serialize() {
        return JSON.stringify(this);
    }
    toObject() {
        return JSON.parse(JSON.stringify(this));
    }

    static Deserialize(json) {
        let obj = json;

        while(typeof obj === "string" || obj instanceof String) {
            obj = JSON.parse(json);
        }

        const notes = (obj.notes || []).map(note => Note.Deserialize(note));

        return new Chord(...notes
        );
    }

    static Conforms(obj) {
        if(obj instanceof Chord) {
            return true;
        } else if(typeof obj !== "object") {
            return false;
        }

        return "notes" in obj;
    }
    static JsonConforms(json) {
        let obj = json;

        while(typeof obj === "string" || obj instanceof String) {
            obj = JSON.parse(obj);
        }

        return Chord.Conforms(obj);
    }
};

//? This is the multi-note version
// export default class Chord {
//     constructor(...notes) {
//         this.notes = notes;
//     }

//     addNote(x, y, base64) {
//         this.notes.push(new Note(x, y, base64));

//         return this;
//     }
//     removeNote(x, y) {
//         this.notes = new Set([ ...this.notes ].filter(note => note.x !== x && note.y !== y));

//         return this;
//     }

//     /* TODO ALlow this to expand to multi-Note chords, instead of just 0,0
//      * |---|---|---|
//      * |---|-x-|---| => |-x-|
//      * |---|---|---|
//      */
//     toCanvas() {
//         if(this.notes.size) {
//             const [ note ] = [ ...this.notes ].filter(note => note.x === 0 && note.y === 0);

//             if(note instanceof Note) {
//                 return note.toCanvas();
//             }
//         }

//         return false;
//     }



//     serialize() {
//         return JSON.stringify(this);
//     }
//     toObject() {
//         return JSON.parse(JSON.stringify(this));
//     }

//     static Deserialize(json) {
//         let obj = json;

//         while(typeof obj === "string" || obj instanceof String) {
//             obj = JSON.parse(json);
//         }

//         const notes = (obj.notes || []).map(note => Note.Deserialize(note));

//         return new Chord(...notes
//         );
//     }

//     static Conforms(obj) {
//         if(obj instanceof Chord) {
//             return true;
//         } else if(typeof obj !== "object") {
//             return false;
//         }

//         return "notes" in obj;
//     }
//     static JsonConforms(json) {
//         let obj = json;

//         while(typeof obj === "string" || obj instanceof String) {
//             obj = JSON.parse(obj);
//         }

//         return Chord.Conforms(obj);
//     }
// };