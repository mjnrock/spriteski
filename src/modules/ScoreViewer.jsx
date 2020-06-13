import React from "react";
import { Segment, Input, Image, Grid } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive";

import { Context } from "./../App";

export default function ScoreViewer(props) {
    const { state } = useNodeContext(Context);

    return (
        <Segment inverted>
            <div style={{
                width: 500,
                height: 500
            }} />
        </Segment>
    );
};