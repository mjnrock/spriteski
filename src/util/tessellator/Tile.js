import crypto from "crypto";

import Base64 from "./../Base64";

export default class Tile {
    constructor(x, y, width, height, { source, tags = [] } = {}) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.tags = new Set(tags);
        this.canvas = document.createElement("canvas");

        this.canvas.width = width;
        this.canvas.height = height;
        
        this.rehash();
        Base64.Decode(source).then(canvas => {
            if(canvas instanceof HTMLCanvasElement) {                
                this.load(canvas);

                this.rehash();
            }
        });
    }

    /**
     * The hash only takes into account the actual contents of the Canvas, as the hash is intended to be used as a persistence natural key
     */
    rehash() {
        this.hash = crypto.createHash("md5").update(this.canvas.toDataURL()).digest("hex");
    }

    get ctx() {
        return this.canvas.getContext("2d");
    }

    load(canvas) {
        const ctx = this.canvas.getContext("2d");

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(canvas, 0, 0);

        this.rehash();
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

    serialize(type = "image/png", quality = 1.0) {
        const obj = this.toObject();
        obj.base64 = this.canvas.toDataURL(type, quality);
        obj.tags = [ ...this.tags ];
        delete obj.canvas;

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

        return new Tile(
            ~~obj.width,
            ~~obj.height,
            ~~obj.x,
            ~~obj.y,
            {
                source: obj.base64,
                tags: Array.isArray(obj.tags) ? obj.tags : [],
            }
        );
    }

    static Conforms(obj) {
        if(obj instanceof Tile) {
            return true;
        } else if(typeof obj !== "object") {
            return false;
        }

        return "width" in obj
            && "height" in obj
            && "x" in obj
            && "y" in obj
            && ("canvas" in obj || "base64" in obj)
            && "tags" in obj;
    }
    static JsonConforms(json) {
        let obj = json;

        while(typeof obj === "string" || obj instanceof String) {
            obj = JSON.parse(obj);
        }

        return Tile.Conforms(obj);
    }
};