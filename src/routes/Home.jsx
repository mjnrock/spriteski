import React from "react";
import { Segment, Header, Step, Icon } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive";

import { Context } from "./../App";
import { EnumMessageType } from "./../reducers";
import UploadImage from "./../components/UploadImage";
import Canvas from "./../components/Canvas";
import TileSizeMenu from "./../modules/TileSizeMenu";
import DataDisplay from "../modules/DataDisplay";

function Home() {
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
            <Header as="h2" color="blue" textAlign="center">
                <Header.Content>Spriteski</Header.Content>
            </Header>

            <Step.Group widths={ 2 }>
                <Step active>
                    <Icon name="upload" />
                    <Step.Content>
                        <Step.Title>Upload</Step.Title>
                    </Step.Content>
                </Step>
                
                <Step>
                    <Icon name="info" />
                    <Step.Content>
                        <Step.Title>Info</Step.Title>
                    </Step.Content>
                </Step>
            </Step.Group>

            <Segment>
                <Segment color="blue">
                    <UploadImage onSelect={ selectImage } />
                </Segment>

                <Segment color="blue">
                    <Canvas image={ state.image.img } />
                </Segment>

                    {
                        state.image.img ? (
                            <>
                                <TileSizeMenu />
                                <DataDisplay />
                            </>
                        ) : null
                    }
            </Segment>
        </Segment>
    );
}

export default Home;