/* eslint-disable */
import React from "react";
import { Segment, Button, Icon, Image } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive/lib/react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { Context } from "./../App";
import { EnumMessageType } from "./../state/reducers";
import Track from "./../components/Track";
import SequencerTrack from "./../util/sequencer/Track";

export default function Sequencer() {
    const { node, state } = useNodeContext(Context);

    function onDragEnd(result) {
        const { source, destination } = result;

        if(!destination) {
            return;
        }

        if(source.droppableId === destination.droppableId) {
            if(source.droppableId === state.mixer.id) {
                node.dispatch(EnumMessageType.REORDER_TRACK, {
                    left: source.index,
                    right: destination.index,
                });
            } else {
                node.dispatch(EnumMessageType.REORDER_FRAME, {
                    track: state.mixer.getTrackById(destination.droppableId),
                    left: source.index,
                    right: destination.index,
                });
            }
        } else {
            //  Different droppable
            const from = state.mixer.getTrackById(source.droppableId);
            const to = state.mixer.getTrackById(destination.droppableId);

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

    const tracks = Array(...state.mixer.tracks.values());

    return (
        <Segment>
            <Segment>
                <Button onClick={ () => node.dispatch(EnumMessageType.ADD_TRACK) }>New Track</Button>
            </Segment>

            <Segment textAlign="center" inverted>
                <Image centered width={ 128 } height={ 128 } src="" />

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

            <DragDropContext onDragEnd={ onDragEnd }>
                <Droppable droppableId={ state.mixer.id } type="droppableItem">
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