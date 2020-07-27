import React, { Fragment } from "react";
import { Form, Header } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive/lib/react";

import { Context } from "../../App";
import { EnumMessageType } from "./../../state/reducers";
import ConfigurationPanel from "./../ConfigurationPanel";

function SequencerOptions() {
    // eslint-disable-next-line
    const { node, state } = useNodeContext(Context);

    function updateConfigByValue(key, value) {
        node.dispatch(EnumMessageType.UPDATE_CONFIGURATION, {
            method: "value",
            option: key,
            input: value,
        })
    }
    
    return (
        <Fragment>
            <Header as="h4" color="grey" textAlign="center">
                <Header.Content>Sequencer Options</Header.Content>
            </Header>

            <ConfigurationPanel />
        </Fragment>
    );
}

export default SequencerOptions;