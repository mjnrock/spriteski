import React from "react";
import { Segment } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive";

import { Context } from "../App";
import { EnumMessageType } from "./../state/reducers";

import UploadImage from "./../components/UploadImage";
import TessellationTabs from "../components/TessellationTabs";

function Upload() {
    const { node } = useNodeContext(Context);

    function selectImage(image) {
        node.dispatch(EnumMessageType.UPLOAD_IMAGE, image);
    }

    return (
        <Segment>
            <Segment color="blue">
                <UploadImage onSelect={ selectImage } />
            </Segment>

            <Segment color="blue">
                <TessellationTabs />
            </Segment>
        </Segment>
    );
}

export default Upload;