import React, { useContext, useEffect, useState } from "react";

import Node from "./lib/node/package";

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

function useNodeState(node) {
    const [ state, setState ] = useState(node.state);

    useEffect(() => {
        const NODE = new Node.Node();

        NODE.watchMessages(node);
        NODE.after = (msg) => {
            setState(node.state);
        }

        return () => NODE.unwatchMessages(node);
    }, []);

    return state;
}

function SubComponent(props) {
    const { node } = useContext(Context);
    const state = useNodeState(node);
    
    return (
        <div>
            <div>Cats: { state.cats }</div>
            <button onClick={ e => node.dispatch("cats", state.cats + 1 )}>Click Me</button>
        </div>
    )
}

export default function App() {
    const state = StateNode;

    return (
        <Context.Provider value={{ node: state }}>
            <SubComponent />
        </Context.Provider>
    );
};