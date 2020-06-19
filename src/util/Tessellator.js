import Base64 from "./Base64";
import TileCanvas from "./TileCanvas";

export default class Tessellator {
    constructor(width, height, { source } = {}) {
        this.tileCanvas = new TileCanvas(128, 128);
        this.image = document.createElement("img");
        
        this.config = {
            width: width,
            height: height,
        };

        if(source) {
            this.draw(source);
        }
    }

    tile(tx, ty, txEnd, tyEnd) {
        return this.tileCanvas.get(tx, ty, txEnd, tyEnd);
    }


    _redrawTiles() {
        this.tileCanvas.fromImage(this.image, {
            width: this.config.width,
            height: this.config.height
        });
    }

    setImage(img) {
        if(img instanceof HTMLImageElement) {
            this.image = img;
            this.tileCanvas.fromImage(this.image, {
                width: this.config.width,
                height: this.config.height
            });
        }
    }

    resize(width, height) {
        this.config.width = width;
        this.config.height = height;

        this.redrawTiles();
    }

    draw(input, { type = "image/png", quality = 1.0 } = {}) {
        return new Promise((resolve, reject) => {
            Base64.Decode(input).then(canvas => {
                if(canvas instanceof HTMLCanvasElement) {
                    this.tileCanvas.draw(canvas);
                    this.image = new Image();
                    this.image.src = canvas.toDataURL(type, quality);

                    resolve(this);
                }
            });
        });
    }

    /**
     * This requires a function that should return an array of all of the arguments to the Tile.toFrame() function.
     * The return array is populated via this.tiles.map, with a frame being generated via tile => tile.toFrame(...fn(tile))
     * @param {function} fn 
     */
    toFrames(fn) {
        if(typeof fn === "function") {
            try {
                const frames = [ ...this.tiles ].map(tile => {
                    const result = fn(tile);

                    if(!Array.isArray(result)) {
                        throw new Error("@fn did not return an array.");
                    }

                    return tile.toFrame(...result);
                });
    
                return frames;
            } catch(e) {
                console.warn(e);

                return false;
            }
        }

        return false;
    }
};