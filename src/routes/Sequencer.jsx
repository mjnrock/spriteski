import React from "react";
import { Segment, Table, Icon } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { Context } from "./../App";

import FrameFinder from "./../modules/FrameFinder";
import ScoreViewer from "../modules/ScoreViewer";
import FrameTableRow from "./../modules/FrameTableRow";

export default function Sequencer() {
    const { state } = useNodeContext(Context);

    return (
        <Segment>
            <FrameFinder />

            <ScoreViewer />

            <Table>
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
                        state.frames.map(({ x, y, frame, tags }, i) => {
                            const key = `${ x }.${ y }`;
                            
                            return (
                                <FrameTableRow
                                    key={ key }
                                    active={ false }
                                    src={ frame.toDataURL() }
                                    duration={ Math.round(Math.random() * 100) }
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