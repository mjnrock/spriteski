import Base64 from "./Base64";

//TODO Refactor canvas usages to use this wrapper class, when appropriate (e.g. <Tessellator>)
//* This has an embedded canvas to act as a <canvas> substitute, but will return this.frame for tile windows
export default class TileCanvas {
    constructor(width, height, { source } = {}) {
        this.width = width;
        this.height = height;
        
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");

        this.frame = document.createElement("canvas");
        this.ftx = this.frame.getContext("2d");

        if(source) {
            Base64.Decode(source).then(canvas => {
                this.canvas = canvas;
                this.ctx = this.canvas.getContext("2d");
            });
        }
    }

    resize(width, height) {
        this.width = width;
        this.height = height;
    }

    fromImage(input, { width, height } = {}) {
        if(input instanceof HTMLImageElement || input instanceof HTMLCanvasElement) {
            this.canvas.width = input.width;
            this.canvas.height = input.height;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(input, 0, 0);
            this.ctx = this.canvas.getContext("2d");

            if(Number.isInteger(width) && Number.isInteger(height)) {
                this.resize(width, height);
            }
        }
    }

    fromDecodable(source, { width, height } = {}) {        
        return new Promise((resolve, reject) => {
            Base64.Decode(source).then(canvas => {
                this.canvas = canvas;
                this.ctx = this.canvas.getContext("2d");
    
                if(Number.isInteger(width) && Number.isInteger(height)) {
                    this.resize(width, height);
                }
            });
        });
    }

    _resetMainCanvas(width, height) {
        if(Number.isInteger(width) && Number.isInteger(height)) {
            this.canvas.width = width;
            this.canvas.height = height;

            this.ctx.clearRect(0, 0, width, height);
        } else {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    _resetFrameCanvas(width, height) {
        if(Number.isInteger(width) && Number.isInteger(height)) {
            this.frame.width = width;
            this.frame.height = height;

            this.ftx.clearRect(0, 0, width, height);
        } else {
            this.ftx.clearRect(0, 0, this.frame.width, this.frame.height);
        }
    }

    /**
     * Will draw a image window from the *tile* location [ @tx, @ty ], to the amount of @tw and @th tiles
     * @param {int} tx 
     * @param {int} ty 
     * @param {int} tw = 1 (optional) 
     * @param {int} th = 1  (optional)
     */
    get(tx, ty, tw = 1, th = 1) {
        let width = tw * this.width,
            height = th * this.height;

        this._resetFrameCanvas(width, height);

        this.ftx.drawImage(
            this.canvas,
            tx * this.width,
            ty * this.height,
            width,
            height,
            0,
            0,
            width,
            height
        );

        return this.frame;
    }

    static DrawTransparency(canvas, tileSize = 16) {
        const ctx = canvas.getContext("2d");

        let iter = 0;
        for (let x = 0; x < canvas.width; x += tileSize) {
            for (let y = 0; y < canvas.height; y += tileSize) {
                ctx.fillStyle = (iter % 2 === 0) ? "#fff" : "#ddd";
                ctx.fillRect(x, y, tileSize, tileSize);
                ++iter;
            }
            ++iter;
        }
    }
}