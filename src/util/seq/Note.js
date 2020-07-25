import Base64 from "../Base64";

export default class Note {
    constructor(base64, duration, x, y) {
        this.x = x;
        this.y = y;
        this.duration = duration;
        this.base64 = Base64.Encode(base64);
    }

    toCanvas() {
        return Base64.Decode(this.base64);
    }

    static FromDecodable(decodable, duration, x = 0, y = 0) {
        return new Note(
            decodable,
            duration,
            x,
            y,
        );
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

        return new Node(
            obj.base64,
            ~~obj.duration,
            ~~obj.x,
            ~~obj.y,
        );
    }

    static Conforms(obj) {
        if(obj instanceof Note) {
            return true;
        } else if(typeof obj !== "object") {
            return false;
        }

        return "x" in obj
            && "y" in obj
            && "duration" in obj
            && "base64" in obj;
    }
    static JsonConforms(json) {
        let obj = json;

        while(typeof obj === "string" || obj instanceof String) {
            obj = JSON.parse(obj);
        }

        return Note.Conforms(obj);
    }
};