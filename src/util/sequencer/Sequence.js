import crypto from "crypto";

import Frame from "./Frame";

export default class Sequence {
    constructor(fps, frames = [], { tags = [] } = {}) {
        this.fps = fps;
        this.frames = frames;
        this.tags = new Set(tags);

        this.rehash();
    }

    rehash() {
        this.hash = crypto.createHash("md5").update(this.serialize()).digest("hex");
    }

    reset(fps) {
        this.fps = fps;
        this.frames = [];
        this.tags = new Set();

        return this;
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

    normalizePositions() {
        let rows = {};

        this.frames.forEach(frame => {
            if(!Array.isArray(rows[ frame.row ])) {
                rows[ frame.row ] = [];
            }

            rows[ frame.row ].push(frame);
        });

        Object.values(rows).forEach((row, i) => {
            row.sort((a, b) => a.index - b.index);
            row.forEach(frame => frame.index = i);
        });

        this.rehash();

        return rows;
    }

    addFrame(frame) {
        if(Frame.Conforms(frame)) {
            this.frames.push(frame);
        } else if(arguments.length >= 4 && arguments.length <= 5) {
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
    addFromDecodable(row, index, duration, base64, { x = 0, y = 0, tags = [] } = {}) {
        let frame = Frame.FromDecodable(
            row,
            index,
            duration,
            base64,
            {
                x: x,
                y: y,
                tags: tags
            }
        )

        this.addFrame(frame);

        return this;
    }

    async toCanvas() {
        return new Promise((resolve, reject) => {
            try {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                const rows = this.normalizePositions();
        
                let x = 0,
                    y = 0;
        
                for(let [ , row ] of Object.entries(rows)) {
                    for(let frame of row) {
                        // let c = await frame.toCanvas();
        
                        // ctx.drawImage(c, x * c.width, y * c.height);

                        //TODO Test/Refactor this; might cause errors as it was previously not asynchronous
                        // eslint-disable-next-line
                        frame.toCanvas().then(c => {
                            ctx.drawImage(c, x * c.width, y * c.height );
                        });
                    }
        
                    y++;
                    x = 0;
                }
    
                resolve(canvas);
            } catch(e) {
                reject(e);
            }
        });
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

        const frames = (obj.frames || []).map(frame => Frame.Deserialize(frame));

        return new Frame(
            obj.fps,
            frames,
            {
                tags: Array.isArray(obj.tags) ? obj.tags : [],
            }
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