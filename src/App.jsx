import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { Header, Segment } from "semantic-ui-react";

import Routes from "./routes/package";
import ScrollToTop from "./ScrollToTop";
import NavBar from "./NavBar";

import initStateNode from "./state/stateNode";

import Dimension from "./util/wip/Dimension";

const dim = new Dimension({
    dimensionality: 3,
    size: 3,
    setter: (i, depth, dimension, size, setter) => {
        return depth.join(".");
    }
});

console.log(JSON.parse(JSON.stringify(dim.cells)));
dim.set("cat", 0, 0, 2);
dim.set("cat", 1, 0, 0);
dim.set("cat", 2, 1, 2);
console.log(dim.cells);

export const Context = React.createContext(initStateNode);

export default function App() {
    return (
        <Router>
            <ScrollToTop>
                <Context.Provider value={{ node: initStateNode }}>
                    <Segment>
                        <Header as="h2" color="blue" textAlign="center">
                            <Header.Content>Spriteski</Header.Content>
                        </Header>

                        <NavBar />

                        <Switch>
                            <Route path="/sequencer">
                                <Routes.Sequencer />
                            </Route>
                            <Route path="/upload">
                                <Routes.Upload />
                            </Route>
                            
                            <Route path="/">
                                <Routes.Home />
                            </Route>
                        </Switch>
                    </Segment>
                </Context.Provider>
            </ScrollToTop>
        </Router>
    );
};