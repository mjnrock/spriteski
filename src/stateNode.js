import { spawnStateNode } from "@lespantsfancy/hive";
import { reducers } from "./reducers";

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
            canvas: canvas,
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
    frames.push([
        x,
        y,
        image,
    ]);

    this.state = {
        ...this.state,
        frames: frames
    };
};
StateNode.tessellate = function(tw, th) {
    const canvas = this.state.canvas.ref;
    let frames = [];
    // const ctx = canvas.getContext("2d");

    for(let x = 0; x < canvas.width; x += tw) {
        for(let y = 0; y < canvas.height; y += th) {
            const frame = document.createElement("canvas", {
                width: tw,
                height: th,
            });
            // const frame = createCanvas(tw, th);
            const ftx = frame.getContext("2d");

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

            frames.push([ x, y, frame ]);
        }
    }

    return frames;
};

export default StateNode;