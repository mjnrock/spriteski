import React, { Fragment } from "react";
import { Header } from "semantic-ui-react";

import ConfigurationPanel from "./ConfigurationPanel";

function SequencerOptions() {    
    return (
        <Fragment>
            <Header as="h4" color="grey" textAlign="center">
                <Header.Content>Sequencer Options</Header.Content>
            </Header>

            <ConfigurationPanel filter={ [ "isSequencing" ] } />
        </Fragment>
    );
}

export default SequencerOptions;