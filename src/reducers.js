export const EnumMessageType = {
    CANVAS: "CANVAS",
    IMAGE: "IMAGE",
    TILE_SIZE: "TILE_SIZE",
    TESSELLATE: "TESSELLATE",
    FRAME_TAG: "FRAME_TAG",
    COLLECTION_TAG: "COLLECTION_TAG",
    DELETE_FRAME: "DELETE_FRAME",
    
    TOGGLE_SEQUENCE_PREVIEW: "TOGGLE_SEQUENCE_PREVIEW",
    ADD_SEQUENCE_FRAME: "ADD_SEQUENCE_FRAME",
    REMOVE_SEQUENCE_FRAME: "REMOVE_SEQUENCE_FRAME",
    UPDATE_SEQUENCE_INDEX: "UPDATE_SEQUENCE_INDEX",
    UPDATE_SEQUENCE_FPS: "UPDATE_SEQUENCE_FPS",
    UPDATE_SEQUENCE_FRAME_SPEED: "UPDATE_SEQUENCE_FRAME_SPEED",

    TOGGLE_TILE_LINES: "TOGGLE_TILE_LINES",
    TILE_LINE_COLOR: "TILE_LINE_COLOR",
};

export const reducers = [
    // (state, msg) => console.log(msg.type, state),
    [
        EnumMessageType.TILE_SIZE,
        (state, msg, node) => {
            const data = msg.payload || {};

            return {
                ...state,
                tile: {
                    ...state.tile,
                    width: data.width,
                    height: data.height
                }
            }
        }
    ], [
        EnumMessageType.DELETE_FRAME,
        (state, msg) => {
            const data = msg.payload || {};

            let frames = [ ...state.frames ];
            frames = frames.filter(frame => !(frame.x === data.x && frame.y === data.y));

            return {
                ...state,
                frames: frames
            }
        }
    ], [
        EnumMessageType.ADD_SEQUENCE_FRAME,
        (state, msg) => {
            const data = msg.payload || {};

            return {
                ...state,
                sequence: {
                    ...state.sequence,
                    score: [
                        ...state.sequence.score,
                        {
                            x: data.x,
                            y: data.y,
                            frame: data.frame,
                            duration: state.sequence.fps,
                            index: state.sequence.score.length || 0
                        }
                    ]
                }
            }
        }
    ], [
        EnumMessageType.REMOVE_SEQUENCE_FRAME,
        (state, msg) => {
            const data = msg.payload || {};

            let newScore = state.sequence.score.filter(f => f.index !== data.index);
            newScore.sort((a, b) => a.index - b.index);
            newScore = newScore.map((obj, i) => ({
                ...obj,
                index: i
            }));

            return {
                ...state,
                sequence: {
                    ...state.sequence,
                    score: newScore
                }
            };
        }
    ], [
        EnumMessageType.UPDATE_SEQUENCE_FPS,
        (state, msg) => {
            const data = msg.payload || {};

            const score = state.sequence.score.map(obj => ({
                ...obj,
                duration: Math.min(obj.duration, data)
            }));

            return {
                ...state,
                sequence: {
                    ...state.sequence,
                    fps: data,
                    score: score
                }
            };
        }
    ], [
        EnumMessageType.UPDATE_SEQUENCE_INDEX,
        (state, msg) => {
            const data = msg.payload || {};

            let index = state.sequence.animation.index;
            switch(data) {
                case "step backward":
                    index = 0;
                    break;
                case "backward":
                    index = Math.max(index - 1, 0);
                    break;
                case "forward":
                    index = Math.min(index + 1, state.sequence.score.length - 1);
                    break;
                case "step forward":
                    index = state.sequence.score.length - 1;
                    break;
                default:
                    break;
            }

            return {
                ...state,
                sequence: {
                    ...state.sequence,
                    animation: {
                        ...state.sequence.animation,
                        index: index
                    }
                }
            };
        }
    ], [
        EnumMessageType.UPDATE_SEQUENCE_FRAME_SPEED,
        (state, msg) => {
            const data = msg.payload || {};

            const score = [];
            state.sequence.score.forEach((obj, i) => {
                score.push({
                    ...obj,
                    duration: obj.x === data.x && obj.y === data.y ? data.speed : obj.duration
                });
            });

            return {
                ...state,
                sequence: {
                    ...state.sequence,
                    score: score
                }
            }
        }
    ], [
        EnumMessageType.FRAME_TAG,
        (state, msg) => {
            const data = msg.payload || {};

            let index = null;
            let frames = [ ...state.frames ];
            const [ frame ] = frames.filter((f, i) => {
                if(f.x === data.x && f.y === data.y) {
                    index = i;

                    return true;
                }

                return false;
            }) || [];

            if(frame && index !== null && index !== void 0) {
                let tags = [ ...data.tags ];

                frames.splice(index, 1, {
                    ...frame,
                    tags
                });
            }

            return {
                ...state,
                frames: frames
            }
        }
    ], [
        EnumMessageType.COLLECTION_TAG,
        (state, msg) => {
            const data = msg.payload || {};

            return {
                ...state,
                collection: {
                    ...state.collection,
                    tags: data
                }
            }
        }
    ], [
        EnumMessageType.TESSELLATE,
        (state, msg, node) => {
            const data = msg.payload || {};

            const frames = node.tessellate(data.width, data.height);

            return {
                ...state,
                frames: frames
            };
        }
    ], [
        EnumMessageType.IMAGE,
        (state, msg) => {
            const data = msg.payload || {};

            return {
                ...state,
                image: {
                    ...state.image,
                    ref: data.image,
                    width: data.width,
                    height: data.height
                }
            }
        }
    ], [
        EnumMessageType.CANVAS,
        (state, msg) => {
            const data = msg.payload || {};

            return {
                ...state,
                canvas: {
                    ...state.canvas,
                    ref: data
                }
            }
        }
    ], [
        EnumMessageType.TOGGLE_TILE_LINES,
        (state, msg) => {
            return {
                ...state,
                config: {
                    ...state.config,
                    showTileLines: !state.config.showTileLines
                }
            }
        }
    ], [
        EnumMessageType.TOGGLE_SEQUENCE_PREVIEW,
        (state, msg, node) => {
            clearTimeout(state.sequence.animation.timeout);
            
            if(state.sequence.animation.isRunning) {
                return {
                    ...state,
                    sequence: {
                        ...state.sequence,
                        animation: {
                            ...state.sequence.animation,
                            timeout: null,
                            isRunning: false
                        }
                    }
                }
            }
        
            node.animateSequence(0);

            return {
                ...state,
                sequence: {
                    ...state.sequence,
                    animation: {
                        ...state.sequence.animation,
                        timeout: null,
                        isRunning: true
                    }
                }
            }
        }
    ], [
        EnumMessageType.TILE_LINE_COLOR,
        (state, msg) => {
            const data = msg.payload || {};

            return {
                ...state,
                config: {
                    ...state.config,
                    tileLineColor: data
                }
            }
        }
    ]
];