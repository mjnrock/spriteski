import Mixer from "./Mixer";

export default class Score {
    constructor(mixer, { weight = 1 } = {}) {
        this.weight = weight;

        if(mixer instanceof Mixer) {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = mixer.pixels.width;
            canvas.height = mixer.pixels.height + mixer.pixels.track.height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            mixer.tracks.each((track, row) => {
                track.frames.each((frame, col) => {
                    frame.each((kanvas, x, y) => {
                        //  Bounced image
                        ctx.drawImage(
                            kanvas,
                            (col * track.pixels.frame.width) + (x * track.tile.width),
                            y * track.tile.height,
                        );

                        //  Original image
                        ctx.drawImage(
                            kanvas,
                            (col * track.pixels.frame.width) + (x * track.tile.width),
                            ((row + 1) * track.pixels.frame.height) + (y * track.tile.height),
                        );
                    });
                });
            });

            this.source = canvas;
        }
    }
};