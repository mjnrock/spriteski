import { useContext, useState, useEffect } from "react";

const RootContext = React.createContext({});

//? This is some random template stuff placed here for convenience; it's not meant to work
function useNodeConntector(node) {
    const Context = useContext(RootContext);
    const [ node, setNode ] = useState(Context.node);

    useEffect(() => {
        function onState(stateObj) {}
        function onMessage(state, msg) {}

        Context.watchState(onState);
        Context.watchMessages(onMessage);
        return () => {
            Context.unwatchState(onState);
            Context.unwatchMessages(onMessage);
        };
    }, []);

    return node;
}