/* eslint-disable */
import React, { useEffect } from "react";
import { Segment } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive";

import { Context } from "./../App";

function drawTransparency(canvas, ctx, tileSize = 16) {
    let iter = 0;
    for(let x = 0; x < canvas.width; x += tileSize) {
        for(let y = 0; y < canvas.height; y += tileSize) {
            ctx.fillStyle = (iter % 2 === 0) ? "#fff" : "#ddd";
            ctx.fillRect(x, y, tileSize, tileSize);
            ++iter;
        }
        ++iter;
    }
}

export default function Canvas(props) {
    const { state } = useNodeContext(Context);
    const canvasRef = React.createRef();

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