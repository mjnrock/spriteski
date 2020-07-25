import crypto from "crypto";

// import Chord from "./Chord";
import Note from "./Note";
import Tile from "../tessellator/Tile";

export default class Frame {
    constructor(row, index, note, { tags = [] } = {}) {
        this.row = row;         // The "z-index" track (i.e. row = 0 draws first, then row = 1, etc.)
        this.index = index;     // The ordinality of the Note cluster or Chord

        // this.chord = new Chord(...notes);
        this.note = note;
        this.tags = new Set(tags);

        this.rehash();
    }

    rehash() {
        this.hash = crypto.createHash("md5").update(this.serialize()).digest("hex");
    }

    addTag(...tags) {
        for(let tag of tags) {
            this.tags.add(tag);
        }

        this.rehash();

        return this;
    }
    removeTag(...tags) {
        for(let tag of tags) {
            this.tags.delete(tag);
        }

        this.rehash();

        return this;
    }
    hasTag(tag) {
        for(let t of this.tags) {
            if(t === tag) {
                return true;
            }
        }

        return false;
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

        this.rehash();

        return false;
    }

    toCanvas() {
        return this.note.toCanvas();
    }

    
    static FromDecodable(row, index, base64, duration, { x = 0, y = 0, tags = [] } = {}) {
        return new Frame(
            row,
            index,
            Note.FromDecodable(base64, duration, x, y),
            {
                tags: tags
            }
        );
    }
    static FromNote(row, index, note, { tags = [] } = {}) {
        if(note instanceof Note) {
            return new Frame(
                row,
                index,
                note,
                {
                    tags: tags
                }
            );
        }
    }
    static FromTile(row, index, tile, duration, { x = 0, y = 0, tags = [] } = {}) {
        if(tile instanceof Tile) {
            return new Frame(
                row,
                index,
                Note.FromDecodable(tile.canvas, duration, x, y),
                {
                    tags: tags
                }
            );
        }
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
        
        // const chord = Chord.Deserialize(obj.chord);
        const note = Note.Deserialize(obj.note);

        return new Frame(
            ~~obj.row,
            ~~obj.index,
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