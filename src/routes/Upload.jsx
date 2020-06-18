import React from "react";
import { Segment } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive";

import { Context } from "../App";
import { EnumMessageType } from "./../state/reducers";

import UploadImage from "./../components/UploadImage";

function Upload() {
    const { node, state } = useNodeContext(Context);

    console.log(state.tessellator.image);

    function selectImage(image) {
        node.dispatch(EnumMessageType.UPLOAD_IMAGE, image);
    }

    return (
        <Segment>
            <Segment color="blue">
                <UploadImage onSelect={ selectImage } />
            </Segment>
        </Segment>
    );
}

export default Upload;