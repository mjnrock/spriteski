import React, { useState, useContext, useEffect } from "react";
import { Segment, Header } from "semantic-ui-react";

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

            <Segment>
                <UploadImage onSelect={ selectImage } />
            </Segment>

            <Segment>
                <Canvas image={ image } />
            </Segment>

            <TileSizeMenu />
            <DataDisplay />
        </Segment>
    );
}

export default Home;