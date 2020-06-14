import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive";

import { Context } from "./../App";

export default function SaveFile(props) {
    const { node, state } = useNodeContext(Context);

    //TODO Create a mini API and send the data there so Node has access to the FileSystem
    //? This works, but could be *better* expressed as an API call
    function download() {
        const obj = node.createManifest();

        const collection = state.collection;
        const element = document.createElement("a");
        element.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj)));
        element.setAttribute("download", `${ collection.id }.json`);

        element.style.display = "none";
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    return (
        <>
            <Button icon labelPosition="left" color="teal" size="large" onClick={ download }>
                <Icon name="download" />
                Save Manifest
            </Button>
        </>
    );
};