/* eslint-disable */
import React, { useState } from "react";
import { Icon } from "semantic-ui-react";

import { ResizableBox } from 'react-resizable';

//TODO The mouse events need to be put at window, so the MouseNode should take over the event processing
//  The current "frame" needs to be kept in context state then, to abstract the mouse events
//TODO Create "Sequencer" class that holds a Mixer and a Collection and facilitates creation/modification and bakes out Scores and Compositions
//  Frame.jsx should dispatch a "Hover Start" and "Hover Finish" event to programmtically dictact the "current frame" (i.e. to which the resize should be applied)
//  The hover selection should be disabled during an active drag, so as not to inadvertently resize non-selected frames
//TODO Visually make the "base unit" minimum width be 1/2 of the tile width, while the max should be 2x the tile width, via a desginated "zoom" slider (e.g. 1 unit = 1/8 note, 1/2 note, etc.)

export default function Frame(props) {
    const [ duration, setDuration ] = useState([ (props.frame.duration / props.fps) * 512, 136 ]);

    console.log(duration);

    return (
        <ResizableBox
            className="frame-resizer"
            axis="x"
            width={ (props.frame.duration / props.fps) * 512 }
            height={ 136 }
            minConstraints={ [ 512 / props.fps, 136 ]}
            maxConstraints={ [ 512, 136 ]}
            handle={
                <Icon
                    name="ellipsis vertical"                
                    color="grey"
                    style={ {
                        position: "absolute",
                        top: "50%",
                        right: -4,
                        marginTop: -4,
                        cursor: "ew-resize",
                    } }
                />
            }
            handleSize={ [ 8, 8 ] }
            draggableOpts={{ grid: [ 512 / props.fps, 512 / props.fps ] }}
            onResize={ (e, { size }) => setDuration(size.width / (512 / props.fps)) }
        >
            <Icon
                name="content"
                color="grey"
                style={ {
                        position: "absolute",
                        top: "50%",
                        left: 4,
                        marginTop: -4,
                    } }
                { ...props.dragHandleProps }
            />

            <img 
                width={ 128 }
                height={ 128 }
                src={ props.frame.source }
            />
        </ResizableBox>
    );
}