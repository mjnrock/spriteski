import React from "react";

import Node from "./lib/node/package";
import { useNodeContext } from "./lib/hooks";

const StateNode = new Node.Node({
    cats: 2
});
StateNode.addReducer("cats", (state, msg) => {
    return {
        ...state,
        cats: msg.payload
    };
})
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