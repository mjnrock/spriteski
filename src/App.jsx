import React from "react";
import { spawnStateNode, useNodeContext } from "@lespantsfancy/hive";

const initStateNode = spawnStateNode({
    cats: 0
}, [ "cats", (state, msg) => {
        return {
            ...state,
            cats: msg.payload
        };
    }
]);
export const Context = React.createContext(initStateNode);

function SubComponent(props) {
    const { node, state } = useNodeContext(Context);
    
    return (
        <div>
            <div>Cats: { state.cats }</div>
            <button onClick={ e => node.dispatch("cats", state.cats + 1 )}>Click Me</button>
        </div>
    )
}

export default function App() {
    return (
        <Context.Provider value={{ node: initStateNode }}>
            <SubComponent />
            <SubComponent />
            <SubComponent />
        </Context.Provider>
    );
};