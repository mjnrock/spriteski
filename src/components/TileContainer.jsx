import React, { Fragment } from "react";
import { useNodeContext } from "@lespantsfancy/hive/lib/react";
import { Table, Image } from "semantic-ui-react";

import { Context } from "../App";

export default function TileContainer(props) {
    const { state } = useNodeContext(Context);

    console.log(state)

    return (
        <Fragment>
            <Table>
                <Table.Header>
                    <Table.Row textAlign="center">
                        <Table.HeaderCell>Tile</Table.HeaderCell>
                        <Table.HeaderCell>X</Table.HeaderCell>
                        <Table.HeaderCell>Y</Table.HeaderCell>
                        <Table.HeaderCell>Size</Table.HeaderCell>
                        <Table.HeaderCell>Tags</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        state.tessellator.tiles.map((tile, i) => {
                            return (
                                <Table.Row textAlign="center" key={ `${ tile.x }.${ tile.y }` }>
                                    <Table.Cell>
                                        <Image centered src={ tile.canvas.toDataURL() } />
                                    </Table.Cell>
                                    <Table.Cell>{ tile.x }</Table.Cell>
                                    <Table.Cell>{ tile.y }</Table.Cell>
                                    <Table.Cell>{ tile.width } x { tile.height }</Table.Cell>
                                    <Table.Cell>{ [ ...tile.tags ].join(", ") }</Table.Cell>
                                </Table.Row>
                            );
                        })
                    }
                </Table.Body>
            </Table>
        </Fragment>
    )
};