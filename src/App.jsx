import React from "react";

import StateNode from "./lib/state";
import { useNodeContext } from "./lib/hooks";

export const Context = React.createContext(StateNode);

function SubComponent(props) {
    const { node, state } = useNodeContext();
    
    return (
        <div>
            <div>Cats: { state.cats }</div>
            <button onClick={ e => node.dispatch("cats", state.cats + 1 )}>Click Me</button>
        </div>
    )
}

export default function App() {
    return (
        <Context.Provider value={{ node: StateNode }}>
            <SubComponent />
            <SubComponent />
            <SubComponent />
        </Context.Provider>
    );
};