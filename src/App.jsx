import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Routes from "./routes/package";

import ScrollToTop from "./ScrollToTop";

const initialState = {
    tile: {
        size: 16
    }
};
export const Context = React.createContext(initialState);

export const EnumMessageType = {
    TILE_SIZE: "TILE_SIZE",
};

const reducer = (state, message) => {
    console.log("Dispatch:", message);
    const data = message.payload;

    if(message.type === EnumMessageType.TILE_SIZE) {
        return {
            ...state,
            tile: {
                ...state.tile,
                size: data
            }
        };
    }

    return state;
};

export default function App() {
    const [ state, dispatch ] = React.useReducer(reducer, initialState);

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