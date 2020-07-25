import React, { Fragment, useState } from "react";
import { Segment } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive/lib/react";

import { Context } from "../App";
import { EnumMessageType } from "./../state/reducers";

import UploadSpritesheet from "../components/UploadSpritesheet";
import TessellationTabs from "../components/TessellationTabs";

function Upload() {
    const { node, state } = useNodeContext(Context);
    const [ hasImage, setHasImage ] = useState(!!state.tessellator.image);

    function selectImage(image) {
        if(!!image) {
            node.dispatch(EnumMessageType.UPLOAD_IMAGE, image);
            
            setHasImage(true);
        }
    }

    return (
        <Fragment>
            <Segment color="blue">
                <UploadSpritesheet onSelect={ selectImage } image={ state.tessellator.image } />
            </Segment>

            {
                hasImage ? (
                    <Fragment>
                        <Segment color="blue">
                            <TessellationTabs />
                        </Segment>
                    </Fragment>
                ) : null
            }
        </Fragment>
    );
}

export default Upload;