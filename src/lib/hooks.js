import { useContext, useState, useEffect } from "react";
import { Context } from "./../App";
import Node from "./node/Node";

export function useNodeContext() {
    const { node } = useContext(Context);
    const [ state, setState ] = useState({
        node: node,
        state: node.state
    });

    useEffect(() => {
        const NODE = new Node();

        NODE.watchMessages(node);
        NODE.after = (msg) => {
            setState({
                node: node,
                state: node.state
            });
        }

        return () => NODE.unwatchMessages(node);
    }, []);

    return state;
};