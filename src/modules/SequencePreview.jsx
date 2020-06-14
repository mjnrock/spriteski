import React, { useEffect } from "react";
import { Segment, Button, Icon } from "semantic-ui-react";
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
            <Button.Group fluid>
                <Button icon onClick={ e => node.dispatch(EnumMessageType.UPDATE_SEQUENCE_INDEX, "step backward") }>
                    <Icon name="step backward" />
                </Button>
                <Button icon onClick={ e => node.dispatch(EnumMessageType.UPDATE_SEQUENCE_INDEX, "backward") }>
                    <Icon name="backward" />
                </Button>
                
                <Button active icon color={ state.sequence.animation.isRunning ? "blue" : null } onClick={ e => node.dispatch(EnumMessageType.TOGGLE_SEQUENCE_PREVIEW) }>
                    <Icon name={ state.sequence.animation.isRunning ? "pause" : "play" } />
                </Button>
                
                <Button icon onClick={ e => node.dispatch(EnumMessageType.UPDATE_SEQUENCE_INDEX, "forward") }>
                    <Icon name="forward" />
                </Button>
                <Button icon onClick={ e => node.dispatch(EnumMessageType.UPDATE_SEQUENCE_INDEX, "step forward") }>
                    <Icon name="step forward" />
                </Button>\
            </Button.Group>

            <canvas ref={ canvasRef } />
        </Segment>
    );
};