/* eslint-disable */
import React, { useEffect, useContext } from "react";
import { Segment } from "semantic-ui-react";

import { Context, EnumMessageType } from "./../App";

function drawTransparency(canvas, ctx) {
    const tSize = 16;

    let iter = 0;
    for(let x = 0; x < canvas.width; x += tSize) {
        for(let y = 0; y < canvas.height; y += tSize) {
            ctx.fillStyle = (iter % 2 === 0) ? "#fff" : "#ddd";
            ctx.fillRect(x, y, tSize, tSize);
            ++iter;
        }
        ++iter;
    }
}

export default function Canvas(props) {
    const { state } = useContext(Context);
    const canvasRef = React.createRef();

    // useEffect(() => {
    //     const canvas = ReactDOM.findDOMNode(canvasRef.current);

    //     if(canvas) {
    //         const ctx = canvas.getContext("2d");
    //         drawTransparency(state.canvas, state.canvas.getContext("2d"));
            
    //         ctx.drawImage(state.canvas, 0, 0);

    //         if(props.image) {
    //             const ar = props.image.width / props.image.height;
    //             let height = props.image.height;
    //             let width = height * ar;

    //             canvas.width = width;
    //             canvas.height = height;

    //             drawTransparency(canvas, ctx);
    //             ctx.drawImage(props.image, 0, 0);
    //         }
    //     }
    // }, [ props.image ]);

    useEffect(() => {
        const canvas = canvasRef.current;

        if(canvas) {
            const ctx = canvas.getContext("2d");

            canvas.width = state.canvas.width;
            canvas.height = state.canvas.height;
            
            ctx.drawImage(state.canvas, 0, 0);
        }
    });

    return (
        <Segment inverted textAlign="center">
            <canvas ref={ canvasRef } />
        </Segment>
    );
};