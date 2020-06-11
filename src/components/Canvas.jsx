/* eslint-disable */
import React, { useEffect } from "react";
import { Image, Tab, Table } from "semantic-ui-react";

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
                    <Table textAlign="center">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Tile</Table.HeaderCell>
                                <Table.HeaderCell>Position</Table.HeaderCell>
                                <Table.HeaderCell>Dimensions</Table.HeaderCell>
                                <Table.HeaderCell>Tags</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {
                                state.frames.map(([ x, y, frame ]) => (                                
                                    <Table.Row key={ `${ x }.${ y }` }>
                                        <Table.Cell>
                                            <Image
                                                style={ {
                                                    border: "1px solid #000",
                                                    margin: 1
                                                } }
                                                src={ frame.toDataURL() }
                                            />
                                        </Table.Cell>
                                        <Table.Cell>
                                            { x }, { y }
                                        </Table.Cell>
                                        <Table.Cell>
                                            { state.tile.width } x { state.tile.height }
                                        </Table.Cell>
                                        <Table.Cell>
                                            []
                                        </Table.Cell>
                                        <Table.Cell>
                                            []
                                        </Table.Cell>
                                    </Table.Row>
                                )) 
                            }
                        </Table.Body>
                    </Table>
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