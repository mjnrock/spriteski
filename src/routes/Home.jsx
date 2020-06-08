import React, { useState, useContext } from "react";
import { Segment, Header } from "semantic-ui-react";

import { Context, EnumMessageType } from "./../App";
import UploadImage from "./../components/UploadImage";
import Canvas from "./../components/Canvas";
import Slider from "./../components/Slider";
import DataDisplay from "./../components/DataDisplay";

function Home() {
    const { state, dispatch } = useContext(Context);
    const [ image, setImage ] = useState();

    function selectImage(img) {
        dispatch({
            type: EnumMessageType.IMAGE_SIZE,
            payload: {
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
                <DataDisplay />
                <Slider label={ <span className="input-label">Tile Size</span> } min={ 0 } max={ 512 } value={ state.tile.size } onChange={ value => dispatch({ type: EnumMessageType.TILE_SIZE, payload: value }) } />
                <Canvas image={ image } />
            </Segment>
        </Segment>
    );
}

export default Home;