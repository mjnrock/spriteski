import React from "react";
import { Image, Segment, Table, Button, Icon } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive/lib/react";

import { Context } from "./../App";
import { EnumMessageType } from "./../state/reducers";
import TagEntry from "./TagEntry";

function TileContainer() {
    const { node, state } = useNodeContext(Context);

    function onTileTag(x, y, tags) {
        node.dispatch(EnumMessageType.TILE_TAG, {
            x,
            y,
            tags,
        });
    }
    function onCollectionTag(tags) {
        if(tags.toString() !== state.collection.tags.toString()) {
            node.dispatch(EnumMessageType.COLLECTION_TAG, tags);
        }
    }

    function deleteTile(x, y) {
        node.dispatch(EnumMessageType.DELETE_TILE, {
            x,
            y,
        });
    }

    return (
        <>
            <Segment basic>
                <TagEntry onTag={ onCollectionTag } tags={ state.collection.tags } />
            </Segment>

            <Table textAlign="center">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Tile</Table.HeaderCell>
                        <Table.HeaderCell>Hash</Table.HeaderCell>
                        <Table.HeaderCell>Position</Table.HeaderCell>
                        <Table.HeaderCell>Dimensions</Table.HeaderCell>
                        <Table.HeaderCell>Tags</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        Object.values(state.collection.tiles).map(({ x, y, width, height, hash, canvas, tags }) => {
                            return (                                
                                <Table.Row key={ `${ x }.${ y }` }>
                                    <Table.Cell width={ 5 }>
                                        <Segment basic>
                                            <Image
                                                centered
                                                style={ {
                                                    border: "1px solid #000",
                                                    margin: "auto"
                                                }}
                                                src={ canvas.toDataURL() }
                                            />
                                        </Segment>
                                    </Table.Cell>
                                    <Table.Cell width={ 2 }>
                                        { hash }
                                    </Table.Cell>
                                    <Table.Cell width={ 2 }>
                                        { x }, { y }
                                    </Table.Cell>
                                    <Table.Cell width={ 2 }>
                                        { width } x { height }
                                    </Table.Cell>
                                    <Table.Cell width={ 3 }>
                                        <TagEntry onTag={ tag => onTileTag(x, y, tag) } tags={ [ ...tags ] } />
                                    </Table.Cell>
                                    <Table.Cell width={ 2 }>
                                        <Button.Group>
                                            <Button
                                                color="red"
                                                basic
                                                icon
                                                onClick={ e => deleteTile(x, y) }
                                            >
                                                <Icon name="trash" onClick={ e => deleteTile(x, y) } />
                                            </Button>
                                        </Button.Group>
                                    </Table.Cell>
                                </Table.Row>
                            );
                        }) 
                    }
                </Table.Body>
            </Table>
        </>
    );
}

export default TileContainer;