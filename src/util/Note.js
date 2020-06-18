import Base64 from "./Base64";

export default class Note {
    constructor(x, y, base64) {
        this.x = x;
        this.y = y;
        this.base64 = Base64.Encode(base64);
    }

    toCanvas() {
        return Base64.Decode(this.base64);
    }

    static FromDecodable(decodable, x = 0, y = 0) {
        return new Note(
            x,
            y,
            decodable
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
            ~~obj.x,
            ~~obj.y,
            obj.base64,
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