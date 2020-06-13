import React from "react";
import { Segment, Image, Grid } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive";

import { Context } from "./../App";

export default function FrameFinder(props) {
    const { state } = useNodeContext(Context);

    return (
        <>
            {/* <Input fluid /> */}

            <Segment>
                <Grid columns="equal">
                    {
                        state.frames.map(({ frame }) => (
                            <Grid.Column>
                            <Image
                                centered
                                style={ {
                                    border: "1px solid rgba(34,36,38,.3)",
                                    margin: 1,
                                    boxShadow: "0 1px 2px 0 rgba(34,36,38,.3)",
                                    borderRadius: 5,
                                    cursor: "pointer"
                                }}
                                src={ frame.toDataURL() }
                            />
                            </Grid.Column>
                        ))
                    }
                </Grid>
            </Segment>
        </>
    );
};