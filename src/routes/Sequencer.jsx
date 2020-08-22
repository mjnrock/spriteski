/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Segment, Button, Icon, Image, Message, Input } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive/lib/react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";

import { Context } from "./../App";
import { EnumMessageType } from "./../state/reducers";
import Track from "./../components/Track";
import SequencerTrack from "./../util/sequencer/Track";

export default function Sequencer() {
    const { node, state } = useNodeContext(Context);
    const [ sequenceName, setSequenceName ] = useState("");

    function startBake() {
        node.dispatch(EnumMessageType.NAME_SEQUENCE, sequenceName);
        node.dispatch(EnumMessageType.BAKE_SEQUENCE);
    }

    function onDragEnd(result) {
        const { source, destination } = result;

        if(!destination) {
            return;
        }

        if(source.droppableId === destination.droppableId) {
            if(source.droppableId === state.sequencer.mixer.id) {
                node.dispatch(EnumMessageType.REORDER_TRACK, {
                    left: source.index,
                    right: destination.index,
                });
            } else {
                node.dispatch(EnumMessageType.REORDER_FRAME, {
                    track: state.sequencer.mixer.getTrackById(destination.droppableId),
                    left: source.index,
                    right: destination.index,
                });
            }
        } else {
            //  Different droppable
            const from = state.sequencer.mixer.getTrackById(source.droppableId);
            const to = state.sequencer.mixer.getTrackById(destination.droppableId);

            if(from instanceof SequencerTrack && to instanceof SequencerTrack) {
                const frame = from.get(source.index);

                node.dispatch(EnumMessageType.RETRACK_FRAME, {
                    from: from,
                    to: to,
                    frame: frame,
                    index: destination.index,
                });
            }
        }
    }

    const tracks = Array(...state.sequencer.mixer.tracks.values());

    if(!tracks.length) {
        return (
            <Segment textAlign="center">
                <Message info>
                    <Message.Header><Link to="/upload">Upload a Spritesheet</Link></Message.Header>
                    <p>Once an algorithm has been executed, you can modify the result Sequence here.</p>
                </Message>
            </Segment>
        )
    }

    return (
        <Segment>
            <Segment color="blue">
                <Button icon color="blue" onClick={ e => startBake() }>
                    <Icon name="fire" />
                    <span style={{ marginLeft: 10 }}>Bake</span>
                </Button>

                <Input className="text-center" type="text" value={ sequenceName } placeholder="Change filename..." onChange={ e => setSequenceName(e.target.value) } style={{ marginLeft: 4 }} />
            </Segment>

            <Segment textAlign="center" inverted>
                <Image centered width={ state.tessellator.config.width } height={ state.tessellator.config.height } src="" />

                <Button.Group icon style={{ marginTop: 8 }}>
                    <Button basic inverted>
                        <Icon name="step backward" />
                    </Button>
                    <Button basic inverted>
                        <Icon name="play" />
                    </Button>
                    <Button basic inverted>
                        <Icon name="stop" color="red" />
                    </Button>
                    <Button basic inverted>
                        <Icon name="step forward" />
                    </Button>
                </Button.Group>
            </Segment>

            //TODO Removing all Frames in a Track is not robust enough to work properly under that case; need "Add Frame" / "Add Track" paradigm to compensate, alongside conditional execution
            //TODO Running all Track's simultaneously slows everything down too much
            <DragDropContext onDragEnd={ onDragEnd }>
                <Droppable droppableId={ state.sequencer.mixer.id } type="droppableItem">
                    { (provided, snapshot) => (
                        <div
                            ref={ provided.innerRef }
                        >
                            { tracks.map((track, index) => (
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