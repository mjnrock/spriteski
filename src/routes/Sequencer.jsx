/* eslint-disable */
import React from "react";
import { Segment, Button } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive/lib/react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { Context } from "./../App";
import { EnumMessageType } from "./../state/reducers";
import Track from "./../components/Track";

export default function Sequencer() {
    const { node, state } = useNodeContext(Context);

    function onDragEnd(result) {
        const { source, destination } = result;

        if(!destination) {
            return;
        }

        if(source.droppableId === destination.droppableId) {
            node.dispatch(EnumMessageType.REORDER_TRACK, {
                left: source.index,
                right: destination.index,
            });
        } else {
            //  Different droppable
        }
    }

    return (
        <Segment>
            <Segment>
                <Button onClick={ () => node.dispatch(EnumMessageType.ADD_TRACK) }>New Track</Button>
            </Segment>

            <DragDropContext onDragEnd={ onDragEnd }>
                <Droppable droppableId={ state.mixer.id }>
                    { (provided, snapshot) => (
                        <div
                            ref={ provided.innerRef }
                        >
                            { [ ...state.mixer.tracks ].map((track, index) => (
                                <Draggable
                                    key={ track.id }
                                    draggableId={ track.id }
                                    index={ index }>
                                    { (provided, snapshot) => (
                                        <div
                                            ref={ provided.innerRef }
                                            { ...provided.draggableProps }
                                        >
                                            <Track track={ track } dragHandleProps={ provided.dragHandleProps }>{ JSON.stringify(track, null, 2) }</Track>                                            
                                        </div>
                                    ) }
                                </Draggable>
                            )) }
                            { provided.placeholder }
                        </div>
                    ) }
                </Droppable>
            </DragDropContext>
        </Segment>
    );
};