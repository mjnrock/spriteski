/* eslint-disable */
import React from "react";
import { Segment, Button, Icon } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive/lib/react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { Context } from "./../App";
import { EnumMessageType } from "./../state/reducers";
import Frame from "./Frame";

export default function Track(props) {
    const { node, state } = useNodeContext(Context);

    function onDragEnd(result) {
        const { source, destination } = result;

        if(!destination) {
            return;
        }

        if(source.droppableId === destination.droppableId) {
            // node.dispatch(EnumMessageType.REORDER_TRACK, {
            //     left: source.index,
            //     right: destination.index,
            // });
        } else {
            //  Different droppable
        }
    }

    return (
        <Segment secondary style={{ marginBottom: 8 }}>
            <Icon name="content" { ...props.dragHandleProps } />
            
            <Segment>
                <Button onClick={ () => node.dispatch(EnumMessageType.ADD_FRAME, { track: props.track }) }>Add Frame</Button>
            </Segment>
            
            <DragDropContext onDragEnd={ onDragEnd }>
                <Droppable droppableId={ props.track.id }>
                    { (provided, snapshot) => (
                        <div
                            ref={ provided.innerRef }
                        >
                            { [ ...((props.track || {}).frames || []) ].map((frame, index) => (
                                <Draggable
                                    key={ frame.id }
                                    draggableId={ frame.id }
                                    index={ index }>
                                    { (provided, snapshot) => (
                                        <div
                                            ref={ provided.innerRef }
                                            { ...provided.draggableProps }
                                            { ...provided.dragHandleProps }
                                        >
                                            <Frame frame={ frame }>{ JSON.stringify(frame, null, 2) }</Frame>                                            
                                        </div>
                                    ) }
                                </Draggable>
                            )) }
                            { provided.placeholder }
                        </div>
                    ) }
                </Droppable>
            </DragDropContext>

            { props.children }
        </Segment>
    );
}