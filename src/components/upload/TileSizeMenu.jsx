import React, { useState, Fragment } from "react";
import { Segment, Header, Button } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive/lib/react";

import { Context } from "./../../App";
import { EnumMessageType } from "./../../state/reducers";
import Slider from "./../Slider";

function TileSizeMenu() {
    const { node, state } = useNodeContext(Context);
    const [ isCustomTileSize, setIsCustomTileSize ] = useState(false);

    function makeButtons() {
        let buttons = [];

        for (let i = 4; i < 10; i++) {
            const n = Math.pow(2, i);
            const isMatch = {
                width: state.tessellator.config.width === n,
                height: state.tessellator.config.height === n,
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
        node.dispatch(EnumMessageType.TILE_SIZE, {
            width: w,
            height: h
        });
    }

    return (
        <Fragment>
            <Header as="h4" color="grey" textAlign="center">
                <Header.Content>Tile Dimensions</Header.Content>
            </Header>

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
                        <Slider label={ <span className="input-label">Tile Width</span> } min={ 1 } max={ 8192 } value={ state.tessellator.config.width } onChange={ value => setTileSize(value, state.tessellator.config.height) } />
                        <Slider label={ <span className="input-label">Tile Height</span> } min={ 1 } max={ 8192 } value={ state.tessellator.config.height } onChange={ value => setTileSize(state.tessellator.config.width, value) } />
                    </Segment>
                ) : null
            }
        </Fragment>
    );
}

export default TileSizeMenu;