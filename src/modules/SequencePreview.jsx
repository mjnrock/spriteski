import React, { useEffect } from "react";
import { Segment, Button } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive";

import { Context } from "../App";
import { EnumMessageType } from "../reducers";

export default function SequencePreview(props) {
    const { node, state } = useNodeContext(Context);
    const canvasRef = React.createRef();

    useEffect(() => {        
        const canvas = canvasRef.current;

        if(canvas && state.sequence.animation.ref) {
            const ctx = canvas.getContext("2d");
    
            canvas.width = state.sequence.animation.ref.width;
            canvas.height = state.sequence.animation.ref.height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(state.sequence.animation.ref, 0, 0);
        }
    });

    return (
        <Segment inverted textAlign="center">
            <Button
                fluid
                color={ state.sequence.animation.timeout ? "blue" : "grey" }
                onClick={ e => node.dispatch(EnumMessageType.TOGGLE_SEQUENCE_PREVIEW) }
            >Retoggle Animation</Button>

            <canvas ref={ canvasRef } />
        </Segment>
    );
};