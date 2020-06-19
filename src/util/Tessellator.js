import Base64 from "./Base64";
import Tile from "./Tile";
import TileCanvas from "./TileCanvas";

export default class Tessellator {
    constructor(width, height, { source } = {}) {
        // this.canvas = document.createElement("canvas");
        this.canvas = new TileCanvas();
        this.image = document.createElement("img");
        
        this.config = {
            width: width,
            height: height,
        };

        this.tiles = new Set();

        if(source) {
            this.draw(source);
        }
    }

    _coreActions() {
        this.imageToCanvas();
        this.tessellate();

        return this;
    }

    setImage(img) {
        if(img instanceof HTMLImageElement) {
            this.image = img;
            this._coreActions();
        }

        return this;
    }

    resize(width, height) {
        this.config.width = width;
        this.config.height = height;

        this._coreActions();
    }

    imageToCanvas() {
        if(this.canvas instanceof HTMLCanvasElement && this.image instanceof HTMLImageElement) {
            const ctx = this.canvas.getContext("2d");

            this.canvas.width = this.image.width;
            this.canvas.height = this.image.height;
            ctx.clearRect(0, 0, this.image.width, this.image.height);            
            ctx.imageSmoothingEnabled = false;

            ctx.drawImage(this.image, 0, 0);

            return true;
        }

        return false;
    }

    tessellate() {
        this.tiles.clear();

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

    draw(input, { type = "image/png", quality = 1.0 } = {}) {
        return new Promise((resolve, reject) => {
            Base64.Decode(input).then(canvas => {
                if(canvas instanceof HTMLCanvasElement) {
                    this.canvas = canvas;
                    this.canvas = new TileCanvas(canvas.width, canvas.height, canvas);
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