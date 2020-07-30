import React, { Fragment, useState, useEffect } from "react";
import { Segment } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive/lib/react";

import { Context } from "../App";
import { EnumMessageType } from "./../state/reducers";

import UploadImageFile from "../components/UploadImageFile";
import PannableContainer from "./../components/PannableContainer";

import UploadComponents from "./../components/upload/package";

function Upload() {
    const { node, state } = useNodeContext(Context);
    const [ hasImage, setHasImage ] = useState(!!state.tessellator.image.src);
    const canvasRef = React.createRef();

    useEffect(() => {        
        const canvas = canvasRef.current;

        if(canvas && hasImage) {
            const ctx = canvas.getContext("2d");
    
            canvas.width = state.tessellator.image.width;
            canvas.height = state.tessellator.image.height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(state.tessellator.image, 0, 0);
        }
    });

    function selectImage(image) {
        if(!!image) {
            node.dispatch(EnumMessageType.UPLOAD_IMAGE, image);
            
            setHasImage(true);
        }
    }

    // if(!hasImage) {
    //     return (
    //         <Fragment>
    //             <Segment color="blue">
    //                 <UploadImageFile onSelect={ selectImage } text="Select Spritesheet" />
    //             </Segment>
    //         </Fragment>
    //     );
    // }
    
    return (
        <Fragment>
            <Segment color="blue" textAlign="center">
                <PannableContainer>
                    <canvas ref={ canvasRef } style={{ margin: "auto" }} />
                </PannableContainer>

                <UploadImageFile onSelect={ selectImage } text="Change Spritesheet" buttonProps={{ color: "red" }} />
            </Segment>

            <Segment color="blue">
                <UploadComponents.TileSizeMenu />
            </Segment>

            <Segment color="blue">
                <UploadComponents.SequencerAlgorithms />
            </Segment>

            <Segment color="blue">
                <UploadComponents.SequencerOptions />
            </Segment>
        </Fragment>
    );
}

export default Upload;