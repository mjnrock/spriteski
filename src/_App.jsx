import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Routes from "./routes/package";

import ScrollToTop from "./ScrollToTop";

const initialState = {
    canvas: document.createElement("canvas", {
        width: 0,
        height: 0
    }),
    tile: {
        width: 0,
        height: 0
    },
    image: {
        width: null,
        height: null
    },

    config: {
        showTileLines: true,
        tileLineColor: "#f00"
    }
};
export const Context = React.createContext(initialState);

export const EnumMessageType = {
    CANVAS: "CANVAS",
    IMAGE: "IMAGE",
    TILE_SIZE: "TILE_SIZE",

    TOGGLE_TILE_LINES: "TOGGLE_TILE_LINES",
    TILE_LINE_COLOR: "TILE_LINE_COLOR",
};

const reducer = (state, message) => {
    console.log("Dispatch:", message);
    const data = message.payload;

    let newState = state;

    if(message.type === EnumMessageType.TILE_SIZE) {
        newState = {
            ...state,
            tile: {
                ...state.tile,
                width: data.width,
                height: data.height
            }
        };
    } else if(message.type === EnumMessageType.IMAGE) {
        newState = {
            ...state,
            image: {
                ...state.image,
                img: data.image,
                width: data.width,
                height: data.height
            }
        };
    } else if(message.type === EnumMessageType.CANVAS) {
        newState = {
            ...state,
            canvas: data
        };
    } else if(message.type === EnumMessageType.TOGGLE_TILE_LINES) {
        newState = {
            ...state,
            config: {
                ...state.config,
                showTileLines: !state.config.showTileLines
            }
        };
    } else if(message.type === EnumMessageType.TILE_LINE_COLOR) {
        newState = {
            ...state,
            config: {
                ...state.config,
                tileLineColor: data
            }
        };
    }

    newState._lastMessage = Object.freeze(message);
    newState._lastMessageAt = Date.now();
    
    return newState;
};

// eslint-disable-next-line
function drawTransparency(canvas, ctx) {
    const tSize = 16;

    let iter = 0;
    for(let x = 0; x < canvas.width; x += tSize) {
        for(let y = 0; y < canvas.height; y += tSize) {
            ctx.fillStyle = (iter % 2 === 0) ? "#fff" : "#ddd";
            ctx.fillRect(x, y, tSize, tSize);
            ++iter;
        }
        ++iter;
    }
}

export default function App() {
    const [ state, dispatch ] = React.useReducer(reducer, initialState);

    useEffect(() => {
        console.log("APP", state);

        const mtype = state._lastMessage ? state._lastMessage.type : null;
        const image = state.image.img;
        const { canvas, tile } = state;
        const ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled= false;

        //TODO Make functions for coloring the canvas, so these events can conditionally invoke
        if(mtype === EnumMessageType.TOGGLE_TILE_LINES) {
            //TODO Create a reaction from this message.
        } else if(mtype === EnumMessageType.TILE_LINE_COLOR) {
            //TODO Create a reaction from this message.
        } else if(mtype === EnumMessageType.IMAGE) {
            canvas.width = image.width;
            canvas.height = image.height;

            ctx.drawImage(image, 0, 0);

            dispatch({
                type: EnumMessageType.CANVAS,
                payload: canvas
            });
        } else if(mtype === EnumMessageType.CANVAS && image) {
            ctx.drawImage(image, 0, 0);
        } else if(mtype === EnumMessageType.TILE_SIZE) {
            //TODO This entire offset structure is demonstably incorrect, being off by a few pixels.  Abstract into functions and reconstruct.
            //? Image dimensions are 0-indexed, and that makes an unaccounted for difference here
            let gap = 2;
            let tileCount = {
                x: Math.ceil(image.width / tile.width),
                y: Math.ceil(image.height / tile.height),
            };

            canvas.width = image.width + tileCount.x * gap;
            canvas.height = image.height + tileCount.y * gap;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            //TODO This ctx draw here does not invoke a rerender, so it ends up 1 dispatch behind
            for(let i = 0; i < tileCount.x; i++) {
                for(let j = 0; j < tileCount.y; j++) {
                    //TODO Store these dimensions as an array of "frames" elsewhere and use them here
                    //? This is obviously not a 1:1 transfer; make a "frames" collection that dynamically updates based on tile size
                    //* Probably can do ^ in the reducer when there is an "IMAGE" or "TILE_SIZE" event, or make a condition in this useEffect (but then where to store?)
                    ctx.drawImage(
                        image,
                        1 + tile.width * i,
                        1 + tile.height * j,
                        tile.width,
                        tile.height,
                        gap + (tile.width * i) + (gap * i),
                        gap + (tile.height * j) + (gap * j),
                        tile.width,
                        tile.height
                    );

                    if(state.config.showTileLines) {
                        let bw = tile.width + gap,
                            bh = tile.height + gap;

                        ctx.strokeStyle = state.config.tileLineColor;
                        ctx.strokeRect(
                            bw * i,
                            bh * j,
                            bw,
                            bh
                        );
                        // ctx.strokeRect(
                        //     (tile.width * i) + (gap * (i - 1)),
                        //     (tile.height * j) + (gap * (j - 1)),
                        //     tile.width + gap,
                        //     tile.height + gap
                        // );
                    }
                }
            }

            dispatch({
                type: EnumMessageType.CANVAS,
                payload: canvas
            });
        }
    });

    return (
        <Router>
            <ScrollToTop>
                <Context.Provider value={{ state, dispatch }}>
                    <Switch>
                        <Route path="/">
                            <Routes.Home />
                        </Route>
                    </Switch>
                </Context.Provider>
            </ScrollToTop>
        </Router>
    );
};