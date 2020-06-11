/* eslint-disable */
import React, { useEffect, useContext } from "react";
import { Segment } from "semantic-ui-react";

import { Context } from "./../App";
import { useNodeContext } from "@lespantsfancy/hive";

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
    const {  state } = useNodeContext(Context);
    const canvasRef = React.createRef();

    useEffect(() => {
        const canvas = canvasRef.current;

        if(canvas) {
            const ctx = canvas.getContext("2d");

            canvas.width = state.canvas.ref.width;
            canvas.height = state.canvas.ref.height;
            
            ctx.drawImage(state.canvas.ref, 0, 0);
        }
    });

    return (
        <Segment inverted textAlign="center">
            <canvas ref={ canvasRef } />
            {
                state.frames.map(([ x, y, frame ]) => (
                    <img src={ frame.toDataURL() } />
                ))
            }
        </Segment>
    );
};