import React from "react";
import { Segment } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive/lib/react";

import { Context } from "../App";
import { EnumMessageType } from "../state/reducers";

import TagEntry from "./TagEntry";

function CollectionTagEntry() {
    const { node, state } = useNodeContext(Context);

    function onCollectionTag(tags) {
        if(tags.toString() !== state.collection.tags.toString()) {
            node.dispatch(EnumMessageType.COLLECTION_TAG, tags);
        }
    }

    return (
        <Segment color="blue">
            <TagEntry onTag={ onCollectionTag } tags={ state.collection.tags } />
        </Segment>
    );
}

export default CollectionTagEntry;