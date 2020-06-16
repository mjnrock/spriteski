import Base64 from "./../util/Base64";

export default class Note {
    constructor(x, y, base64) {
        this.x = x;
        this.y = y;        
        this.base64 = base64;
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

        return new Node(
            obj.x,
            obj.y,
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