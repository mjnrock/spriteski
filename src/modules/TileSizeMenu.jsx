import React, { useState, useContext } from "react";
import { Segment, Header, Button } from "semantic-ui-react";

import { Context, EnumMessageType } from "../App";
import Slider from "../components/Slider";

function TileSizeMenu() {
    const { state, dispatch } = useContext(Context);

    const [ isCustomTileSize, setIsCustomTileSize ] = useState(false);

    function makeButtons() {
        let buttons = [];

        for (let i = 4; i < 10; i++) {
            const n = Math.pow(2, i);
            const isMatch = {
                width: state.tile.width === n,
                height: state.tile.height === n,
            };
            isMatch.both = isMatch.width && isMatch.height;
            isMatch.neither = !isMatch.width && !isMatch.height;
            isMatch.xor = (!isMatch.width && isMatch.height) || (isMatch.width && !isMatch.height);

            buttons.push(
                <Button
                    key={ `${ n }x${ n }` }
                    basic={ isMatch.neither || isMatch.xor }
                    color="blue"
                    onClick={ e => {
                        setTileSize(n, n);
                        setIsCustomTileSize(false);
                    } }
                    active={ isMatch.both }
                >{ n } x { n }</Button>
            );
        }

        return buttons;
    }

    function setTileSize(w, h) {
        dispatch({
            type: EnumMessageType.TILE_SIZE,
            payload: {
                width: w,
                height: h
            }
        });
    }

    return (
        <Segment color="blue">
            <Header as="h4" color="grey" textAlign="center">
                <Header.Content>Tile Dimensions</Header.Content>
            </Header>

            {/* //TODO WIP */}
            {/* <Segment basic>
                <input
                    type="color"
                    value={ state.config.tileLineColor }
                    onChange={ console.log }
                />
                <Button onClick={ e => dispatch({
                    type: EnumMessageType.TOGGLE_TILE_LINES
                })}>
                    <Icon name={ state.config.showTileLines ? "hide" : "unhide" } />
                </Button>
            </Segment> */}

            <Button.Group fluid>
                {
                    makeButtons()
                }
                <Button
                    basic={ !isCustomTileSize }
                    color="grey"
                    active={ isCustomTileSize }
                    onClick={ e => setIsCustomTileSize(true) }
                >Custom</Button>
            </Button.Group>

            {
                isCustomTileSize ? (
                    <Segment basic>
                        <Slider label={ <span className="input-label">Tile Width</span> } min={ 1 } max={ 512 } value={ state.tile.width } onChange={ value => setTileSize(state.tile.width, value) } />
                        <Slider label={ <span className="input-label">Tile Height</span> } min={ 1 } max={ 512 } value={ state.tile.height } onChange={ value => setTileSize(value, state.tile.height) } />
                    </Segment>
                ) : null
            }
        </Segment>
    );
}

export default TileSizeMenu;