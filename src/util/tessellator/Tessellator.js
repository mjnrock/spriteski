import Base64 from "../Base64";
import TileCanvas from "./TileCanvas";

export default class Tessellator {
    constructor(width, height, { source } = {}) {
        this.tileCanvas = new TileCanvas(width, height);
        this.image = document.createElement("img");
        this.tiles = [];
        
        this.config = {
            width: width,
            height: height,
        };

        if(source) {
            this.from(source);
        }
    }

    tile(tx, ty, txEnd, tyEnd) {
        return this.tileCanvas.get(tx, ty, txEnd, tyEnd);
    }


    tessellate() {
        this.tiles = this.toTiles();
    }

    redrawTiles() {
        this.tileCanvas.fromImage(this.image, {
            width: this.config.width,
            height: this.config.height
        });

        this.tessellate();
    }

    setImage(img) {
        if(img instanceof HTMLImageElement) {
            this.image = img;

            this.redrawTiles();
        }
    }

    resize(width, height) {
        this.config.width = width;
        this.config.height = height;

        this.redrawTiles();
    }

    copyFrom(input, { type = "image/png", quality = 1.0 } = {}) {
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

    toTiles() {
        return this.tileCanvas.toTiles();
    }
};