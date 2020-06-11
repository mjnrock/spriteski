import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
// import { spawnStateNode } from "@lespantsfancy/hive";
import initStateNode from "./stateNode";

import Routes from "./routes/package";
import ScrollToTop from "./ScrollToTop";
import { EnumMessageType } from "./reducers";
import Message from "@lespantsfancy/hive/lib/Message";
// import StateNode from "./stateNode";

// const initStateNode = spawnStateNode({
//     canvas: document.createElement("canvas", {
//         width: 0,
//         height: 0
//     }),
//     tile: {
//         width: 0,
//         height: 0
//     },
//     image: {
//         img: null,
//         width: null,
//         height: null
//     },

//     config: {
//         showTileLines: true,
//         tileLineColor: "#f00"
//     }
// }, ...reducers);
// reducers.forEach(reducer => {
//     if(Array.isArray(reducer)) {
//         console.log(...reducer)
//         initStateNode.addReducer(...reducer);
//     } else {
//         initStateNode.addReducer(reducer);
//     }
// });
// console.log(initStateNode._reducers.toString())
initStateNode.after = (state, msg, node) => {
    const data = msg.payload || {};

    if(msg.type === EnumMessageType.IMAGE) {
        node.drawImage(data.image);
    } else if(msg.type === EnumMessageType.TILE_SIZE) {
        const canvas = state.canvas.ref;
        const image = state.image.ref;
        const ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled= false;
        const tile = state.tile;
        
        let tileCount = {
            x: Math.ceil(image.width / tile.width),
            y: Math.ceil(image.height / tile.height),
        };
        let bw = tile.width,
            bh = tile.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);
        ctx.strokeStyle = "#f00";

        for(let i = 0; i < tileCount.x; i++) {
            for(let j = 0; j < tileCount.y; j++) {
                ctx.strokeRect(
                    bw * i,
                    bh * j,
                    bw,
                    bh
                );
            }
        }
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