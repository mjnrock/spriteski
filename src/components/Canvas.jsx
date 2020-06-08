import React, { useEffect } from "react";
import ReactDOM from "react-dom";

export default function Canvas(props) {
    const canvasRef = React.createRef();

    useEffect(() => {
        const canvas = ReactDOM.findDOMNode(canvasRef.current);

        if(canvas && props.image) {
            const ctx = canvas.getContext("2d");
            const ar = props.image.width / props.image.height;
            let height = Math.min(props.image.height, 500);
            let width = height * ar;
            
            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(props.image, 0, 0);
        }
    }, [ props.image, canvasRef ]);

    return (
        <canvas ref={ canvasRef } style={{ border: "1px solid #000" }} />
    );
};