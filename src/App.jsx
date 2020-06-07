import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

// import Routes from "./routes/package";

import ScrollToTop from "./ScrollToTop";

const initialState = {};
export const Context = React.createContext(initialState);

export const EnumMessageType = {
    MESSAGE: "MESSAGE",
};

const reducer = (state, message) => {
    console.log("Dispatch:", message);
    // const data = message.payload || {};

    if(message.type === EnumMessageType.MESSAGE) {
        return state;
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
                            <div>Home</div>
                        </Route>
                    </Switch>
                </Context.Provider>
            </ScrollToTop>
        </Router>
    );
};