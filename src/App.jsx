import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { spawnStateNode } from "@lespantsfancy/hive";

import Routes from "./routes/package";
import ScrollToTop from "./ScrollToTop";
import { reducers, EnumMessageType } from "./reducers";

const initStateNode = spawnStateNode({
    canvas: document.createElement("canvas", {
        width: 0,
        height: 0
    }),
    tile: {
        width: 0,
        height: 0
    },
    image: {
        img: null,
        width: null,
        height: null
    },

    config: {
        showTileLines: true,
        tileLineColor: "#f00"
    }
}, ...reducers);
initStateNode.after = (state, msg, node) => {
    const data = msg.payload || {};

    if(msg.type === EnumMessageType.IMAGE) {
        const ctx = state.canvas.getContext("2d");
        state.canvas.width = data.image.width;
        state.canvas.height = data.image.height;
        ctx.drawImage(data.image, 0, 0);
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