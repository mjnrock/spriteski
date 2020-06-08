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
                image: data.image,
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
        const { canvas } = state;
        const ctx = canvas.getContext("2d");

        if(mtype === EnumMessageType.TILE_SIZE) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            //TODO Split the canvas image into tiles and paint somewhere (multiple canvases?, big canvas?, images?)
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