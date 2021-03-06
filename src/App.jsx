import React from "react";
import {
    Router,
    Switch,
    Route,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import { Header, Segment } from "semantic-ui-react";

import Routes from "./routes/package";
import ScrollToTop from "./ScrollToTop";
import NavBar from "./NavBar";

import initStateNode from "./state/stateNode";

export const history = createBrowserHistory();

export const Context = React.createContext(initStateNode);

export default function App() {
    return (
        <Router history={ history }>
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
                            <Route path="/collection">
                                <Routes.Collection />
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