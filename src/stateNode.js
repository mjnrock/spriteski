import { spawnStateNode } from "@lespantsfancy/hive";
import { reducers } from "./reducers";
import { v4 as uuidv4 } from "uuid";

const StateNode = spawnStateNode({
    canvas: {
        width: null,
        height: null,
        ref: document.createElement("canvas", {
            width: 0,
            height: 0,
        }),
    },
    image: {
        width: null,
        height: null,
        ref: null,
    },
    tile: {
        width: 0,
        height: 0,
    },

    collection: {
        id: uuidv4(),
        tags: [],
    },
    frames: [],
}, ...reducers);

StateNode.drawImage = function(image) {
    const canvas = this.state.canvas.ref;
    const ctx = canvas.getContext("2d");

    this.state.canvas.ref.width = image.width;
    this.state.canvas.ref.height = image.height;

    ctx.drawImage(image, 0, 0);
    
    this.state = {
        ...this.state,
        canvas: {
            ...this.state.canvas,
            ref: canvas,
            width: image.width,
            height: image.height,
        }
    };
}
StateNode.resizeCanvas = function(width, height) {
    this.state.canvas.ref.width = width;
    this.state.canvas.ref.height = height;
    
    this.state = {
        ...this.state,
        canvas: {
            ...this.state.canvas,
            width,
            height,
        }
    };
}
StateNode.addFrame = function(x, y, image) {
    let frames = [
        ...this.state.frames
    ];
    frames.push({
        x,
        y,
        frame: image,
        tags: [],
    });

    this.state = {
        ...this.state,
        frames: frames
    };
};
StateNode.tessellate = function(tw, th) {
    const canvas = this.state.canvas.ref;
    let frames = [];
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#f00";

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this.state.image.ref, 0, 0);
    ctx.imageSmoothingEnabled= false;
    for(let x = 0; x < canvas.width; x += tw) {
        for(let y = 0; y < canvas.height; y += th) {
            const frame = document.createElement("canvas");
            // const frame = createCanvas(tw, th);
            const ftx = frame.getContext("2d");

            frame.width = tw;
            frame.height = th;

            ftx.drawImage(
                canvas,
                x,
                y,
                tw,
                th,
                0,
                0,
                tw,
                th,
            );

            frames.push({
                x: x / tw,
                y: y / th,
                frame,
                tags: [],
            });
        }
    }
    
    for(let x = 0; x < canvas.width; x += tw) {
        for(let y = 0; y < canvas.height; y += th) {
            ctx.strokeRect(
                x,
                y,
                tw,
                th
            );
        }
    }

    return frames;
};

//? This creates a "manifest" file that recursively base64-encodes all occurences of HTMLImageElement or HTMLCanvasElement
StateNode.createManifest = function() {    
    const recurseAndBase64 = (obj, newObj) => {
        for (let key in obj) {
            let element = obj[ key ];

            if (element instanceof HTMLCanvasElement || element.tagName === "CANVAS") {
                newObj[ key ] = element.toDataURL("image/png", 1);
            } else if (element instanceof HTMLImageElement || element.tagName === "IMG") {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                canvas.width = element.width;
                canvas.height = element.height;
                ctx.drawImage(element, 0, 0);

                newObj[ key ] = canvas.toDataURL("image/png", 1);
            } else if (typeof element === "object") {
                if (Array.isArray(element)) {
                    newObj[ key ] = element.map(entry => recurseAndBase64(entry, {}));
                } else {
                    newObj[ key ] = recurseAndBase64(element, {});
                }
            } else {
                newObj[ key ] = obj[ key ];
            }
        }

        return newObj;
    };

    const obj = recurseAndBase64(this.state, {});
    delete obj.canvas;

    return obj;
}

export default StateNode;