import Base64 from "./Base64";

//TODO Refactor canvas usages to use this wrapper class, when appropriate (e.g. <Tessellator>)
//* This has an embedded canvas to act as a <canvas> substitute, but will return this.frame for tile windows
export default class TileCanvas {
    constructor(source, width, height) {
        this.width = width;
        this.height = height;

        Base64.Decode(source).then(canvas => {
            this.canvas = canvas;
            this.ctx = this.canvas.getContext("2d");
        });

        this.frame = document.createElement("canvas");
        this.ftx = this.frame.getContext("2d");
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

            this.ctx.clearRect(0, 0, width, height);
        } else {
            this.ctx.clearRect(0, 0, this.frame.width, this.frame.height);
        }
    }

    /**
     * If @txEnd and @tyEnd are included, then a multi-tile window will be returned from the rectangle bound by [@tx, @ty] to [@txEnd, @tyEnd].
     * Otherwise, a one (1) tile window will be returned
     * @param {int} tx 
     * @param {int} ty 
     * @param {int} txEnd (optional) 
     * @param {int} tyEnd  (optional)
     */
    get(tx, ty, txEnd, tyEnd) {
        if(txEnd !== void 0 && tyEnd !== void 0) {
            let dx = txEnd - tx,
                dy = txEnd - ty,
                width = dx * this.width,
                height = dy * this.height;

            this._resetFrameCanvas(width, height);

            this.ftx.drawImage(
                canvas,
                tx * this.width,
                ty * this.height,
                width,
                height,
                0,
                0,
                width,
                height
            );
        } else {
            this._resetFrameCanvas(this.frame.width, this.frame.height);

            this.ftx.drawImage(
                this.canvas,
                tx * this.width,
                ty * this.height,
                this.width,
                this.height,
                0,
                0,
                this.width,
                this.height
            );

            return this.frame;
        }
    }
}