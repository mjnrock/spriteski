import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Routes from "./routes/package";
import ScrollToTop from "./ScrollToTop";
import { EnumMessageType } from "./reducers";
import initStateNode from "./stateNode";

initStateNode.after = (state, msg, node) => {
    const data = msg.payload || {};

    if(msg.type === EnumMessageType.IMAGE) {
        node.drawImage(data.image);
    } else if(msg.type === EnumMessageType.TILE_SIZE) {
        node.dispatch(EnumMessageType.TESSELLATE, {
            width: data.width,
            height: data.height,
        });
    }
};
export const Context = React.createContext(initStateNode);

export default function App() {
    return (
        <Router>
            <ScrollToTop>
                <Context.Provider value={{ node: initStateNode }}>
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