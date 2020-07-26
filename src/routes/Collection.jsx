/* eslint-disable */
import React from "react";
import { Segment } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive/lib/react";

import { Context } from "../App";
import TileSelectionGrid from "./../components/TileSelectionGrid";
import CollectionTagEntry from "./../components/CollectionTagEntry";

export default function Collection() {
    const { node, state } = useNodeContext(Context);

    return (
        <Segment textAlign="center">
            {
                state.collection.size ? (
                    <CollectionTagEntry />
                ) : null
            }

            <TileSelectionGrid />
        </Segment>
    );
};