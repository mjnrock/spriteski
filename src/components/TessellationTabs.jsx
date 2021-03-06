/* eslint-disable */
import React, { useEffect } from "react";
import { Tab } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive/lib/react";

import { Context } from "../App";
import PannableContainer from "./PannableContainer";
import TileSizeMenu from "../components/TileSizeMenu";
import DataDisplay from "../components/TileImageDetail";

export default function TessellationTabs(props) {
    const { state, node } = useNodeContext(Context);
    const canvasRef = React.createRef();

    function redrawCanvas() {
        const canvas = canvasRef.current;

        if(canvas) {
            const ctx = canvas.getContext("2d");

            canvas.width = state.tessellator.image.width;
            canvas.height = state.tessellator.image.height;

            ctx.drawImage(state.tessellator.image, 0, 0);
        }
    }

    useEffect(() => {
        redrawCanvas();
    });

    const panes = [
        {
            menuItem: "Spritesheet",
            render: () => (
                <Tab.Pane textAlign="center" as={ PannableContainer }>
                    <canvas ref={ canvasRef } style={{ margin: "auto" }} />
                </Tab.Pane>
            ),
        },
        {
            menuItem: "Detail",
            render: () => (
                <Tab.Pane textAlign="center">
                    <TileSizeMenu />
                        
                    <DataDisplay />
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