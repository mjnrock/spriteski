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
    } else if(msg.type === EnumMessageType.ADD_SEQUENCE_FRAME) {
        node.createSequence();
        node.animateSequence();
    }
};
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
                            <Route path="/upload">
                                <Routes.Upload />
                            </Route>
                            <Route path="/sequencer">
                                <Routes.Sequencer />
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