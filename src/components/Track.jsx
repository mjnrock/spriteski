/* eslint-disable */
import React from "react";
import { Segment, Button, Icon, Menu } from "semantic-ui-react";
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
            <Menu secondary>
                <Menu.Item>
                    <Icon color="grey" name="content" { ...props.dragHandleProps } />
                </Menu.Item>
                <Menu.Item>
                    <Button icon labelPosition="left" onClick={ () => node.dispatch(EnumMessageType.ADD_FRAME, { track: props.track }) }>
                        <Icon name="add" />
                        Add Frame
                    </Button>
                </Menu.Item>
                
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Icon name="x" color="grey" style={{ cursor: "pointer" }} />
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            
            {/* <Droppable droppableId={ props.track.id } direction="horizontal"> //TODO Convert this to horizontal list */}
            <Droppable droppableId={ props.track.id } direction="horizontal">
                { (provided, snapshot) => (
                    <div
                        ref={ provided.innerRef }
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "nowrap",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            // padding: "grid",
                            // overflow: "auto",
                        }}
                    >
                        { frames.map((frame, index) => (
                            <Draggable
                                key={ frame.id }
                                draggableId={ frame.id }
                                index={ index }>
                                { (provided, snapshot) => (
                                    <div
                                        ref={ provided.innerRef }
                                        { ...provided.draggableProps }
                                    >
                                        <Frame frame={ frame } fps={ 16 } height={ 128 } width={ 128 } dragHandleProps={ provided.dragHandleProps }>{ frame.id }</Frame>                                            
                                    </div>
                                ) }
                            </Draggable>
                        )) }
                        { provided.placeholder }
                    </div>
                ) }
            </Droppable>

            { props.children }
        </Segment>
    );
}