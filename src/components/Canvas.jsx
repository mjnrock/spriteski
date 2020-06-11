/* eslint-disable */
import React, { useEffect } from "react";
import { Segment, Tab } from "semantic-ui-react";

import { Context } from "./../App";
import { useNodeContext } from "@lespantsfancy/hive";

function drawTransparency(canvas, ctx) {
    const tSize = 16;

    let iter = 0;
    for (let x = 0; x < canvas.width; x += tSize) {
        for (let y = 0; y < canvas.height; y += tSize) {
            ctx.fillStyle = (iter % 2 === 0) ? "#fff" : "#ddd";
            ctx.fillRect(x, y, tSize, tSize);
            ++iter;
        }
        ++iter;
    }
}

export default function Canvas(props) {
    const { state } = useNodeContext(Context);
    const canvasRef = React.createRef();

    function redrawCanvas() {
        const canvas = canvasRef.current;

        if(canvas) {
            const ctx = canvas.getContext("2d");

            canvas.width = state.canvas.ref.width;
            canvas.height = state.canvas.ref.height;

            ctx.drawImage(state.canvas.ref, 0, 0);
        }
    }

    useEffect(() => {
        redrawCanvas();
    });

    const panes = [
        {
            menuItem: "Canvas",
            render: () => (
                <Tab.Pane inverted textAlign="center">
                    <canvas ref={ canvasRef } />
                </Tab.Pane>
            ),
        },
        {
            menuItem: "Tiles",
            render: () => (
                <Tab.Pane textAlign="center">
                    {
                        state.frames.length ? (
                            state.frames.map(([ x, y, frame ]) => (
                                <div key={ `${x}.${y}` }>
                                    <img
                                        style={ {
                                            border: "1px solid #000",
                                            margin: 1
                                        } }
                                        src={ frame.toDataURL() }
                                    />
                                    <div>{ x }, { y }</div>
                                </div>
                            )) 
                        ): null
                    }
                </Tab.Pane>
            ),
        },
    ];

    return (
        <Tab
            menu={{ secondary: true, pointing: true }}
            panes={ panes }
        />
    );
};