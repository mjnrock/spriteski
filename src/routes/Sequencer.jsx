import React, { useState } from "react";
import { Segment, Table, Icon, Input } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { Context } from "./../App";

import FrameFinder from "./../modules/FrameFinder";
import SequencePreview from "../modules/SequencePreview";
import FrameTableRow from "./../modules/FrameTableRow";

export default function Sequencer() {
    const { state } = useNodeContext(Context);
    const [ fps, setFps ] = useState(8);

    return (
        <Segment>
            <FrameFinder />

            <SequencePreview />

            <Input label="FPS" type="number" fluid min={ 1 } max={ 60 } value={ fps } onChange={ e => setFps(~~e.target.value) } />

            <Table color="blue">
                <Table.Header>
                    <Table.Row textAlign="center">
                        <Table.HeaderCell width={ 1 }>
                            <Icon name="adjust" />
                        </Table.HeaderCell>

                        <Table.HeaderCell width={ 7 }>
                            <Icon name="image" />
                        </Table.HeaderCell>

                        <Table.HeaderCell width={ 8 }>
                            <Icon name="clock outline" />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        state.sequence.score.map(({ x, y, frame, duration }, i) => {
                            const key = `${ i }:${ x }.${ y }`;
                            
                            return (
                                <FrameTableRow
                                    key={ key }
                                    active={ false }
                                    src={ frame.toDataURL() }
                                    duration={ duration }
                                    maxFps={ fps }
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