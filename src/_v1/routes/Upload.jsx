import React from "react";
import { Segment } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive";

import { Context } from "../App";
import { EnumMessageType } from "../reducers";
import UploadImage from "../components/UploadImage";
import Canvas from "../components/Canvas";
import TileSizeMenu from "../modules/TileSizeMenu";
import DataDisplay from "../modules/DataDisplay";
import SaveFile from "../components/SaveFile";

function Upload() {
    const { node, state } = useNodeContext(Context);

    function selectImage(img) {
        node.dispatch(EnumMessageType.IMAGE, {
            image: img,
            width: img.width,
            height: img.height
        });
    }

    return (
        <Segment>
            <Segment color="blue">
                <UploadImage onSelect={ selectImage } />
                {
                    state.image.ref && state.tile.width > 0 ? (
                        <SaveFile />
                    ) : null
                }
            </Segment>

            {
                state.image.ref ? (
                    <>
                        <TileSizeMenu />
                        <DataDisplay />
                    </>
                ) : null
            }

            <Segment color="blue">
                <Canvas />
            </Segment>
        </Segment>
    );
}

export default Upload;