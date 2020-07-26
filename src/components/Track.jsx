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

    // function onDragEnd(result) {
    //     const { source, destination } = result;

    //     if(!destination) {
    //         return;
    //     }

    //     if(source.droppableId === destination.droppableId) {
    //         node.dispatch(EnumMessageType.REORDER_FRAME, {
    //             track: props.track,
    //             left: source.index,
    //             right: destination.index,
    //         });
    //     } else {
    //         //  Different droppable
    //     }
    // }


    const frames = [ ...props.track.frames.values() ] || [];

    return (
        <Segment secondary style={{ marginBottom: 8 }}>
            <Icon name="content" { ...props.dragHandleProps } />
            
            <Segment>
                <Button onClick={ () => node.dispatch(EnumMessageType.ADD_FRAME, { track: props.track }) }>Add Frame</Button>
            </Segment>
            
            {/* <DragDropContext onDragEnd={ onDragEnd }> */}
                <Droppable droppableId={ props.track.id }>
                    { (provided, snapshot) => (
                        <div
                            ref={ provided.innerRef }
                        >
                            { frames.map((frame, index) => { console.log(frame.id); return (
                                <Draggable
                                    key={ frame.id }
                                    draggableId={ frame.id }
                                    index={ index }>
                                    { (provided, snapshot) => (
                                        <div
                                            ref={ provided.innerRef }
                                            { ...provided.draggableProps }
                                        >
                                            <Frame frame={ frame } dragHandleProps={ provided.dragHandleProps }>{ frame.id }</Frame>                                            
                                        </div>
                                    ) }
                                </Draggable>
                            )}) }
                            { provided.placeholder }
                        </div>
                    ) }
                </Droppable>
            {/* </DragDropContext> */}

            { props.children }
        </Segment>
    );
}