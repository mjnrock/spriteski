export const EnumMessageType = {
    CANVAS: "CANVAS",
    IMAGE: "IMAGE",
    TILE_SIZE: "TILE_SIZE",
    TESSELLATE: "TESSELLATE",
    FRAME_TAG: "FRAME_TAG",
    COLLECTION_TAG: "COLLECTION_TAG",
    DELETE_FRAME: "DELETE_FRAME",
    
    ADD_SEQUENCE_FRAME: "ADD_SEQUENCE_FRAME",
    UPDATE_SEQUENCE_FPS: "UPDATE_SEQUENCE_FPS",

    TOGGLE_TILE_LINES: "TOGGLE_TILE_LINES",
    TILE_LINE_COLOR: "TILE_LINE_COLOR",
};

export const reducers = [
    (state, msg) => console.log(msg.type, state),
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
    ],  [
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
                            duration: 0,
                            index: state.sequence.score.length
                        }
                    ]
                }
            }
        }
    ],   [
        EnumMessageType.UPDATE_SEQUENCE_FPS,
        (state, msg) => {
            const data = msg.payload || {};

            return {
                ...state,
                sequence: {
                    ...state.sequence,
                    fps: data
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