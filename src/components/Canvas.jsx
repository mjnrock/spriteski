/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Tab, Segment } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive";

import { Context } from "./../App";
import CollectionEntry from "./../modules/CollectionEntry";

export function drawTransparency(canvas, ctx) {
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

function TabWrapper(props) {
    const [ start, setStart ] = useState({ x: 0, y: 0 });
    const [ isDown, setIsDown ] = useState(false);

    return (
        <Segment
            basic
            style={{ overflow: "scroll", maxHeight: 600, cursor: "move" }}
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

export default function Canvas(props) {
    const { state, node } = useNodeContext(Context);
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
                <Tab.Pane textAlign="center" as={ TabWrapper }>
                    <canvas ref={ canvasRef } style={{ margin: "auto" }} />
                </Tab.Pane>
            ),
        },
        {
            menuItem: "Tiles",
            render: () => (
                <Tab.Pane textAlign="center">
                    <CollectionEntry />
                </Tab.Pane>
            ),
        },
    ];

    return (
        <Tab
            onTabChange={ e => node.dispatch() }
            menu={{ secondary: true, pointing: true }}
            panes={ panes }
        />
    );
};