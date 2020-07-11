import React from "react";
import { Segment } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive/lib/react";

import { Context } from "../App";
import { EnumMessageType } from "./../state/reducers";

import UploadImage from "./../components/UploadImage";
import TessellationTabs from "../components/TessellationTabs";

import DataDisplay from "./../components/DataDisplay";
import TileSizeMenu from "../components/TileSizeMenu";

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

            <Segment>
                <DataDisplay />
                <TileSizeMenu />
            </Segment>
        </Segment>
    );
}

export default Upload;