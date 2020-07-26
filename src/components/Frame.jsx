/* eslint-disable */
import React, { useState } from "react";
import { Icon } from "semantic-ui-react";

//TODO The mouse events need to be put at window, so the MouseNode should take over the event processing
//  The current "frame" needs to be kept in context state then, to abstract the mouse events
//TODO Create "Sequencer" class that holds a Mixer and a Collection and facilitates creation/modification and bakes out Scores and Compositions
//  Frame.jsx should dispatch a "Hover Start" and "Hover Finish" event to programmtically dictact the "current frame" (i.e. to which the resize should be applied)
//  The hover selection should be disabled during an active drag, so as not to inadvertently resize non-selected frames
//TODO Visually make the "base unit" minimum width be 1/2 of the tile width, while the max should be 2x the tile width, via a desginated "zoom" slider (e.g. 1 unit = 1/8 note, 1/2 note, etc.)

export default function Frame(props) {
    const [ pos, setPos ] = useState({
        x: null,
        y: null,
        width: null,
    });
    const [ width, setWidth ] = useState(props.width);

    function onDragStart(e) {
        setPos({
            x: e.clientX,
            y: e.clientY,
            width: width,
        });
    }
    function onDrag(e) {
        if(pos.x !== null && pos.y !== null) {
            const w = pos.width + Math.floor((e.clientX - pos.x) / props.fps) * props.fps;
    
            setWidth(w);
        }
    }
    function onDragEnd(e) {
        setPos({
            x: null,
            y: null,
            width: null,
        });
    }

    return (
        <div
            onMouseDown={ onDragStart }
            onMouseMove={ onDrag }
            onMouseUp={ onDragEnd }
            style={{
                marginBottom: 4,
                width: width,
            }}
        >
            <div style={{
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                border: "1px solid #000",
                borderRadius: 6,
            }}>
                <Icon name="content" { ...props.dragHandleProps } />
            </div>

            <div style={{
                height: props.height,
                width: props.width,
                border: "1px solid rgba(0, 0, 0, 0.15)",
                borderRadius: 6,
            }}>

                <img src={ props.frame.source } />
            </div>

            { props.children }
        </div>
    );
}