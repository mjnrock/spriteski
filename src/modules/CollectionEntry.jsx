import React from "react";
import { Image, Segment, Table, Button, Icon } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive";

import { Context } from "./../App";
import { EnumMessageType } from "./../reducers";
import TagEntry from "./TagEntry";

function CollectionEntry() {
    const { node, state } = useNodeContext(Context);

    function onFrameTag(x, y, tags) {
        node.dispatch(EnumMessageType.FRAME_TAG, {
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

    function deleteFrame(x, y) {
        node.dispatch(EnumMessageType.DELETE_FRAME, {
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
                        <Table.HeaderCell>Position</Table.HeaderCell>
                        <Table.HeaderCell>Dimensions</Table.HeaderCell>
                        <Table.HeaderCell>Tags</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        state.frames.map(({ x, y, frame, tags }) => (                                
                            <Table.Row key={ `${ x }.${ y }` }>
                                <Table.Cell width={ 8 }>
                                    <Segment basic>
                                        <Image
                                            centered
                                            style={ {
                                                border: "1px solid #000",
                                                margin: "auto"
                                            } }
                                            src={ frame.toDataURL() }
                                        />
                                    </Segment>
                                </Table.Cell>
                                <Table.Cell width={ 2 }>
                                    { x }, { y }
                                </Table.Cell>
                                <Table.Cell width={ 2 }>
                                    { state.tile.width } x { state.tile.height }
                                </Table.Cell>
                                <Table.Cell width={ 2 }>
                                    <TagEntry onTag={ tag => onFrameTag(x, y, tag) } tags={ tags } />
                                </Table.Cell>
                                <Table.Cell width={ 2 }>
                                    <Button.Group>
                                        <Button
                                            color="red"
                                            basic
                                            icon
                                            onClick={ e => deleteFrame(x, y) }
                                        >
                                            <Icon name="trash" onClick={ e => deleteFrame(x, y) } />
                                        </Button>
                                    </Button.Group>
                                </Table.Cell>
                            </Table.Row>
                        )) 
                    }
                </Table.Body>
            </Table>
        </>
    );
}

export default CollectionEntry;