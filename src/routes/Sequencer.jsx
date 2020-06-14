import React, { useState } from "react";
import { Segment, Table, Icon, Input, Grid } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { Context } from "./../App";
import { EnumMessageType } from "./../reducers";

import SequencePreview from "../modules/SequencePreview";
import FrameTableRow from "./../modules/FrameTableRow";

export default function Sequencer() {
    const { node, state } = useNodeContext(Context);
    const [ fps, setFps ] = useState(state.sequence.fps);

    function adjustFps(e) {
        const value = ~~e.target.value;

        if(Number.isInteger(value)) {
            node.dispatch(EnumMessageType.UPDATE_SEQUENCE_FPS, value);
            setFps(value);
        }
    }

    function adjustFrameSpeed(x, y, i, speed) {
        node.dispatch(EnumMessageType.UPDATE_SEQUENCE_FRAME_SPEED, {
            x,
            y,
            i,
            speed,
        });
    }

    return (
        <Segment>
            <SequencePreview />

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
                    {
                        state.sequence.score.map(({ x, y, frame, duration, index }) => {
                            const key = `${ index }:${ x }.${ y }`;
                            
                            return (
                                <FrameTableRow
                                    key={ key }
                                    active={ state.sequence.animation.index === index }
                                    src={ frame.toDataURL() }
                                    duration={ duration }
                                    maxFps={ fps }
                                    onAdjustSpeed={ speed => adjustFrameSpeed(x, y, index, speed) }
                                    onDelete={ () => node.dispatch(EnumMessageType.REMOVE_SEQUENCE_FRAME, {
                                        index: ~~index
                                    }) }
                                />
                            );
                        })
                    }
                </Table.Body>

                {/* <DragDropContext>
                    <Droppable>
                        <Table.Body>
                            {
                                state.frames.map(({ x, y, frame, tags }, i) => {
                                    const key = `${ x }.${ y }`;
                                    
                                    return (
                                        <Draggable draggableId={ key } index={ i }>                                    
                                            <FrameTableRow
                                                key={ key }
                                                active={ false }
                                                src={ frame.toDataURL() }
                                                duration={ Math.round(Math.random() * 100) }
                                            />
                                        </Draggable>
                                    );
                                })
                            }
                        </Table.Body>
                    </Droppable>
                </DragDropContext> */}
            </Table>
        </Segment>
    );
};