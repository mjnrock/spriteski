import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Segment } from "semantic-ui-react";

export default function Canvas(props) {
    const canvasRef = React.createRef();

    useEffect(() => {
        const canvas = ReactDOM.findDOMNode(canvasRef.current);

        if(canvas && props.image) {
            const ctx = canvas.getContext("2d");
            const ar = props.image.width / props.image.height;
            let height = props.image.height;
            let width = height * ar;

            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(props.image, 0, 0);
        }
    }, [ props.image, canvasRef ]);

    return (
        <Segment basic textAlign="center">
            <canvas ref={ canvasRef } style={ { border: "1px solid #000" } } />
        </Segment>
    );
};