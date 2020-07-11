/* eslint-disable */
import React, { useState } from "react";
import { Segment, Table, Icon, Input, Grid } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive/lib/react";

import { Context } from "./../App";
import { EnumMessageType } from "./../state/reducers";
// import SequencePreview from "./../components/SequencePreview";

export default function Sequencer() {
    const { node, state } = useNodeContext(Context);
    const [ fps, setFps ] = useState(1);

    function adjustFps(e) {
        const value = ~~e.target.value;

        if(Number.isInteger(value)) {
            // node.dispatch(EnumMessageType.UPDATE_SEQUENCE_FPS, value);
            setFps(value);
        }
    }

    return (
        <Segment>
            {/* <SequencePreview /> */}

            <Grid columns="equal">
                <Grid.Row>
                    <Grid.Column textAlign="center">
                        <Input label="FPS" color="teal" type="number" fluid min={ 1 } max={ 60 } value={ fps } onChange={ adjustFps } style={{ textAlign: "center" }} />
                    </Grid.Column>
                    <Grid.Column>
                        <Input label="ms" labelPosition="right" readOnly={ true } value={ (1000 / fps).toFixed(2) } fluid style={{ textAlign: "center" }} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <Table color="blue">
                <Table.Header>
                    <Table.Row textAlign="center">
                        <Table.HeaderCell width={ 1 }>
                            <Icon name="adjust" />
                        </Table.HeaderCell>

                        <Table.HeaderCell width={ 7 }>
                            <Icon name="image" />
                        </Table.HeaderCell>

                        <Table.HeaderCell width={ 7 }>
                            <Icon name="clock outline" />
                        </Table.HeaderCell>

                        <Table.HeaderCell width={ 1 }>
                            <Icon name="bars" />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row textAlign="center">
                        <Table.Cell>
                            TODO
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </Segment>
    );
};