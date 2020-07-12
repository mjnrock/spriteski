import React, { Fragment, useState } from "react";
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
    const [ hasImage, setHasImage ] = useState(false);

    function selectImage(image) {
        node.dispatch(EnumMessageType.UPLOAD_IMAGE, image);
        
        setHasImage(!!image);
    }

    return (
        <Segment>
            <Segment color="blue">
                <UploadImage onSelect={ selectImage } />
            </Segment>

            {
                hasImage ? (
                    <Fragment>
                        <Segment color="blue">
                            <TessellationTabs />
                        </Segment>

                        <Segment>
                            <DataDisplay />
                            <TileSizeMenu />
                        </Segment>
                    </Fragment>
                ) : null
            }
        </Segment>
    );
}

export default Upload;