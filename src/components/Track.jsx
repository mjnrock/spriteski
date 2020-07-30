/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Segment, Button, Icon, Grid, Image, Input } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive/lib/react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import { Context } from "./../App";
import { EnumMessageType } from "./../state/reducers";
import Frame from "./Frame";
import { EnumEventType as EnumTrackEventType } from "./../util/sequencer/Track";

export default function Track(props) {
    const { node } = useNodeContext(Context);
    const [ source, setSource ] = useState(props.track.selected.source);

    useEffect(() => {
        const fn = () => setSource(props.track.selected.source);
        props.track.on(EnumTrackEventType.NEXT, fn);
        props.track.on(EnumTrackEventType.PREVIOUS, fn);
        props.track.on(EnumTrackEventType.MOVE, fn);

        return () => {
            props.track.off(EnumTrackEventType.NEXT, fn);
            props.track.off(EnumTrackEventType.PREVIOUS, fn);
            props.track.off(EnumTrackEventType.MOVE, fn);
        }
    }, [ props.track ]);

    function stopPreview() {
        props.track.stop();
        props.track.move();
    }
    function startPreview() {
        props.track.start();
    }

    const frames = [ ...props.track.frames.values() ] || [];

    return (
        <Segment secondary style={ { marginBottom: 8 } }>
            <Grid centered verticalAlign="middle" columns="equal">
                <Grid.Row>
                    <Grid.Column width={ 1 }>
                        <Icon color="grey" name="content" { ...props.dragHandleProps } />
                    </Grid.Column>
                    <Grid.Column width={ 14 }>
                        <Button icon onClick={ () => node.dispatch(EnumMessageType.ADD_FRAME, { track: props.track }) }>
                            <Icon name="add" />
                            <span style={{ marginLeft: 10 }}>Add Frame</span>      
                        </Button>

                        <Button icon color="red" inverted onClick={ () => node.dispatch(EnumMessageType.ADD_FRAME, { track: props.track }) }>
                            <Icon name="minus" />
                            <span style={{ marginLeft: 10 }}>Remove Frame</span>                        
                        </Button>
                        
                        <Input className="text-center" value={ 16 } type="number" min={ 1 } max={ 60 } icon="clock outline" iconPosition="left" style={{ marginRight: 4 }} />
                        <Input className="text-center" value={ "128 x 128" } type="type" icon="expand" iconPosition="left" readOnly />
                    </Grid.Column>
                    <Grid.Column width={ 1 }>
                        <Icon name="x" color="grey" style={ { cursor: "pointer" } } />
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <Grid celled>
                <Grid.Row>
                    <Grid.Column width={ 3 }>
                        <Image centered width={ 128 } height={ 128 } src={ source } />

                        <Button.Group icon fluid style={{ marginTop: 8 }}>
                            <Button>
                                <Icon name="step backward" onClick={ e => props.track.previous() } />
                            </Button>
                            {
                                (props.track.timeout !== void 0 && props.track.timeout !== null) ? (
                                    <Button>
                                        <Icon name="stop" color="red" onClick={ stopPreview } />
                                    </Button>
                                ) : (
                                    <Button>
                                        <Icon name="play" onClick={ startPreview } />
                                    </Button>
                                )
                            }
                            <Button>
                                <Icon name="step forward" onClick={ e => props.track.next() } />
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
                                                    <Frame track={ props.track } frame={ frame } index={ index } fps={ 16 } isSelected={ props.track.index === index } dragHandleProps={ provided.dragHandleProps }>{ frame.id }</Frame>
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