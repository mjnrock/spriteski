import React from "react";
import { Segment, Step, Icon } from "semantic-ui-react";

import Upload from "./Upload";

function Home() {
    return (
        <Segment>
            <Step.Group widths={ 2 }>
                <Step active>
                    <Icon name="upload" />
                    <Step.Content>
                        <Step.Title>Upload</Step.Title>
                    </Step.Content>
                </Step>
                
                <Step>
                    <Icon name="video play" />
                    <Step.Content>
                        <Step.Title>Sequencer</Step.Title>
                    </Step.Content>
                </Step>
            </Step.Group>

            <Upload />
        </Segment>
    );
}

export default Home;