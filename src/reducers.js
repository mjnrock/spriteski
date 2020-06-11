export const EnumMessageType = {
    CANVAS: "CANVAS",
    IMAGE: "IMAGE",
    TILE_SIZE: "TILE_SIZE",

    TOGGLE_TILE_LINES: "TOGGLE_TILE_LINES",
    TILE_LINE_COLOR: "TILE_LINE_COLOR",
};

export const reducers = [
    (state, msg) => console.log(state, msg),
    [
        EnumMessageType.TILE_SIZE,
        (state, msg) => {
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