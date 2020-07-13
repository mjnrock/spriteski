import Mixer from "./Mixer";

export default class Score {
    constructor(mixer, { weight = 1 } = {}) {
        this.weight = weight;

        if(mixer instanceof Mixer) {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = mixer.pixels.width;
            canvas.height = mixer.pixels.height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            mixer.tracks.each((track, i) => {
                track.frames.each((frame, j) => {
                    frame.each((kanvas, x, y) => {
                        ctx.drawImage(
                            kanvas,
                            (j * track.pixels.frame.width) + (x * track.tile.width),
                            (i * track.pixels.frame.height) + (y * track.tile.height),
                        );
                    });
                });
            });

            this.canvas = canvas;
        }
    }
};