import React, { useState } from "react";
import { Segment, Image, Grid, Input, Accordion, Button } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive";

import { Context } from "./../App";
import { EnumMessageType } from "./../reducers";

export default function FrameFinder(props) {
    const { node, state } = useNodeContext(Context);
    const [ isVisible, setIsVisible ] = useState(true);

    function addToScore(x, y, frame) {
        node.dispatch(EnumMessageType.ADD_SEQUENCE_FRAME, {
            x,
            y,
            frame,
        });
    }

    return (
        <Accordion>
            <Accordion.Title
                active={ isVisible === 0 }
                index={ 0 }
            >
                <Button onClick={ () => setIsVisible(!isVisible) }>Toggle Lookup</Button>
            </Accordion.Title>
            <Accordion.Content active={ isVisible }>
                <Input icon="search" fluid placeholder="Search frames..." />

                <Segment color="blue">
                    <Grid columns="equal">
                        {
                            isVisible ? state.frames.map(({ x, y, frame }) => {
                                const key = `${ x }.${ y }`;
                                const data = frame.toDataURL();
                                
                                return (
                                    <Grid.Column key={ key }>
                                        <Image
                                            centered
                                            style={ {
                                                border: "1px solid rgba(34,36,38,.3)",
                                                margin: 1,
                                                boxShadow: "0 1px 2px 0 rgba(34,36,38,.3)",
                                                borderRadius: 5,
                                                cursor: "pointer"
                                            }}
                                            onClick={ e => addToScore(x, y, frame) }
                                            src={ data }
                                        />
                                    </Grid.Column>
                                );
                            }) : null
                        }
                    </Grid>
                </Segment>
            </Accordion.Content>
        </Accordion>
    );
};