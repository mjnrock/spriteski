/* eslint-disable */
import React from "react";
import { Segment, Button, Icon, Menu } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive/lib/react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import { Context } from "./../App";
import { EnumMessageType } from "./../state/reducers";
import Frame from "./Frame";

export default function Track(props) {
    const { node } = useNodeContext(Context);


    const frames = [ ...props.track.frames.values() ] || [];

    return (
        <Segment secondary style={ { marginBottom: 8 } }>
            <Menu secondary>
                <Menu.Item>
                    <Icon color="grey" name="content" { ...props.dragHandleProps } />
                </Menu.Item>
                <Menu.Item>
                    <Button icon onClick={ () => node.dispatch(EnumMessageType.ADD_FRAME, { track: props.track }) }>
                        <Icon name="add" />
                        <span style={{ marginLeft: 10 }}>Add Frame</span>      
                    </Button>

                    <Button icon color="red" inverted onClick={ () => node.dispatch(EnumMessageType.ADD_FRAME, { track: props.track }) }>
                        <Icon name="minus" />
                        <span style={{ marginLeft: 10 }}>Remove Frame</span>                        
                    </Button>
                </Menu.Item>

                <Menu.Menu position="right">
                    <Menu.Item>
                        <Icon name="x" color="grey" style={ { cursor: "pointer" } } />
                    </Menu.Item>
                </Menu.Menu>
            </Menu>

            <Droppable droppableId={ props.track.id } direction="horizontal">
                { (provided, snapshot) => (
                    <div
                        ref={ provided.innerRef }
                        style={ {
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "nowrap",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            overflowX: "scroll",
                        } }
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
                                        <Frame frame={ frame } fps={ 16 } dragHandleProps={ provided.dragHandleProps }>{ frame.id }</Frame>
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