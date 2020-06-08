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
        width: 500,
        height: 500
    }),
    tile: {
        width: 16,
        height: 16
    },
    image: {
        width: null,
        height: null
    }
};
export const Context = React.createContext(initialState);

export const EnumMessageType = {
    CANVAS: "CANVAS",
    IMAGE: "IMAGE",
    TILE_SIZE: "TILE_SIZE",
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
    }

    newState._lastMessage = Object.freeze(message);
    newState._lastMessageAt = Date.now();
    
    return newState;
};

export default function App() {
    const [ state, dispatch ] = React.useReducer(reducer, initialState);

    useEffect(() => {
        console.log("APP", state);

        const mtype = state._lastMessage ? state._lastMessage.type : null;
        const image = state.image.img;
        const { canvas, tile } = state;
        const ctx = canvas.getContext("2d");

        if(mtype === EnumMessageType.TILE_SIZE) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let gap = 1;
            let tileCount = {
                x: Math.ceil(image.width / tile.width),
                y: Math.ceil(image.height / tile.height),
            };

            canvas.width = image.width + tileCount.x * gap;
            canvas.height = image.height + tileCount.y * gap;

            for(let i = 0; i < tileCount.x; i++) {
                for(let j = 0; j < tileCount.y; j++) {
                    //TODO Store these dimensions as an array of "frames" elsewhere and use them here
                    //? This is obviously not a 1:1 transfer; make a "frames" collection that dynamically updates based on tile size
                    //* Probably can do ^ in the reducer when there is an "IMAGE" or "TILE_SIZE" event, or make a condition in this useEffect (but then where to store?)
                    ctx.drawImage(
                        image,
                        tile.width * i,
                        tile.height * j,
                        tile.width,
                        tile.height,
                        (tile.width * i) + (gap * i),
                        (tile.height * j) + (gap * j),
                        tile.width,
                        tile.height
                    );
                }
            }
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