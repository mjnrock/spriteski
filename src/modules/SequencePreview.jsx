import React, { useEffect } from "react";
import { Segment } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive";

import { Context } from "../App";

export default function SequencePreview(props) {
    const { state } = useNodeContext(Context);
    const canvasRef = React.createRef();

    useEffect(() => {
        const canvas = canvasRef.current;

        if(canvas && state.sequence.canvas) {
            const ctx = canvas.getContext("2d");
    
            canvas.width = state.sequence.canvas.width;
            canvas.height = state.sequence.canvas.height;
            ctx.drawImage(state.sequence.canvas, 0, 0);
        }
    });

    return (
        <Segment inverted>
            <canvas ref={ canvasRef } />
        </Segment>
    );
};