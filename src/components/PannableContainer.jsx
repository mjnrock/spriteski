import React, { useState } from "react";
import { Segment } from "semantic-ui-react";

export default function PannableContainer(props) {
    const [ start, setStart ] = useState({ x: 0, y: 0 });
    const [ isDown, setIsDown ] = useState(false);

    return (
        <Segment
            basic
            style={{ overflow: "auto", maxHeight: props.maxHeight || 600, cursor: "move" }}
            onMouseDown={ e => {
                if(!isDown) {
                    setIsDown(true);
                    setStart({
                        x: e.clientX,
                        y: e.clientY,
                    });
                }
            }}
            onMouseUp={ e => {
                setIsDown(false); 
                setStart({
                    x: 0,
                    y: 0,
                });
            }}
            onMouseMove={ e => {
                if(isDown && e.buttons === 1) {
                    const container = e.target.parentNode;
                    const dx = start.x - e.clientX;
                    const dy = start.y - e.clientY;

                    container.scrollLeft += dx;
                    container.scrollTop += dy;

                    setStart({
                        x: e.clientX,
                        y: e.clientY,
                    });
                }
            }}
        >
            { props.children }
        </Segment>
    );
}