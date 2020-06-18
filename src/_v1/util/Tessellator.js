import Tile from "./Tile";
import Base64 from "./Base64";

export default class Tessellator {
    constructor(width, height, { source } = {}) {
        this.canvas = document.createElement("canvas");
        this.image = document.createElement("image");
        
        this.config = {
            width: width,
            height: height,
        };

        this.tiles = new Set();

        if(source) {
            this.draw(source);
        }
    }

    imageToCanvas() {
        if(this.canvas instanceof HTMLCanvasElement && this.image instanceof HTMLImageElement) {
            const ctx = this.canvas.getContext("2d");
            ctx.clearRect(0, 0, Math.max(this.canvas.width, this.image.width), Math.max(this.canvas.height, this.image.height));
            this.canvas.width = this.image.width;
            this.canvas.height = this.image.height;
            ctx.drawImage(this.image, 0, 0);
            ctx.imageSmoothingEnabled = false;

            return true;
        }

        return false;
    }

    draw(input, { type = "image/png", quality = 1.0 } = {}) {
        return new Promise((resolve, reject) => {
            Base64.Decode(input).then(canvas => {
                if(canvas instanceof HTMLCanvasElement) {
                    this.canvas = canvas;
                    this.image = new Image();
                    this.image.src = canvas.toDataURL(type, quality);
                    
                    this.tessellate();

                    resolve({
                        canvas,
                        tiles: [ ...this.tiles ]
                    });
                }
            });
        });
    }

    tessellate() {
        this.tiles = new Set();

        for(let x = 0; x < this.canvas.width; x += this.config.width) {
            for(let y = 0; y < this.canvas.height; y += this.config.height) {
                this.tiles.add(new Tile(
                    x / this.config.width,
                    y / this.config.height,
                    this.config.width,
                    this.config.height,
                    {
                        source: this.canvas
                    }
                ));
            }
        }
    
        return this;
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