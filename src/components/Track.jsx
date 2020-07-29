/* eslint-disable */
import React from "react";
import { Segment, Button, Icon, Menu, Grid, Image, Input } from "semantic-ui-react";
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

                    <Input className="text-center" value={ 16 } type="number" min={ 1 } max={ 60 } icon="clock outline" iconPosition="left" />
                    <Input className="text-center" value={ "128 x 128" } type="type" icon="expand" iconPosition="left" readonly />
                </Menu.Item>

                <Menu.Menu position="right">
                    <Menu.Item>
                        <Icon name="x" color="grey" style={ { cursor: "pointer" } } />
                    </Menu.Item>
                </Menu.Menu>
            </Menu>

            <Grid celled>
                <Grid.Row>
                    <Grid.Column width={ 3 }>
                        <Image centered width={ 128 } height={ 128 } src="" />

                        <Button.Group icon fluid style={{ marginTop: 8 }}>
                            <Button>
                                <Icon name="step backward" />
                            </Button>
                            <Button>
                                <Icon name="play" />
                            </Button>
                            <Button>
                                <Icon name="stop" color="red" />
                            </Button>
                            <Button>
                                <Icon name="step forward" />
                            </Button>
                        </Button.Group>
                    </Grid.Column>
                    <Grid.Column width={ 13 }>
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
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            { props.children }
        </Segment>
    );
}