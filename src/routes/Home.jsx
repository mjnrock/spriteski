import React, { useState, useContext } from "react";
import { Segment, Header, Step, Icon } from "semantic-ui-react";

import { Context, EnumMessageType } from "./../App";
import UploadImage from "./../components/UploadImage";
import Canvas from "./../components/Canvas";
import TileSizeMenu from "./../modules/TileSizeMenu";
import DataDisplay from "../modules/DataDisplay";

function Home() {
    // eslint-disable-next-line
    const { state, dispatch } = useContext(Context);
    const [ image, setImage ] = useState();

    function selectImage(img) {
        dispatch({
            type: EnumMessageType.IMAGE,
            payload: {
                image: img,
                width: img.width,
                height: img.height
            }
        });
        setImage(img);
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
                    <Canvas image={ image } />
                </Segment>

                    {
                        image ? (
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