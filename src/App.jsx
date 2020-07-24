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
import Cell from "./util/wip/Cell";

const dim = new Dimension({
    dimensionality: 2,
    size: 5,
});

// dim.set(0, 0, "cat");
// dim.set(1, 0, "cat");
// dim.set(2, 1, "cat");
// dim.swap(2, 1, 2, 0);
console.log(dim.cells);
console.log(dim.range([ 0, 0 ], 2, {
    extractor: function(input) {
        if(input instanceof Cell) {
            return input.coords.join(".");
        }
        
        return input;
    }
}));

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