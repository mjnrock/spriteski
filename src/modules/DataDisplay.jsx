import React, { useContext } from "react";
import { Table, Segment, Icon } from "semantic-ui-react";

import { Context } from "../App";

export default function Canvas(props) {
    const { state } = useContext(Context);

    const divisible = {
        width: (state.image.width % state.tile.width) === 0,
        height: (state.image.height % state.tile.height) === 0,
    };

    return (
        <Segment color="blue">
            <Table celled structured verticalAlign="middle" textAlign="center">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan="2">Image</Table.HeaderCell>
                        <Table.HeaderCell colSpan="2">Tile</Table.HeaderCell>
                    </Table.Row>

                    <Table.Row>
                        <Table.HeaderCell>Width</Table.HeaderCell>
                        <Table.HeaderCell>Height</Table.HeaderCell>
                        <Table.HeaderCell>Width</Table.HeaderCell>
                        <Table.HeaderCell>Height</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            { state.image.width }
                        </Table.Cell>
                        <Table.Cell>
                            { state.image.height }
                        </Table.Cell>
                        <Table.Cell>
                            { state.tile.width }
                        </Table.Cell>
                        <Table.Cell>
                            { state.tile.height }
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell colSpan="2">{ state.image.width * state.image.height } px</Table.Cell>
                        <Table.Cell positive={ divisible.width ? true : false }>                            
                            {
                                divisible.width ? (
                                    <Icon name="check" color="green" />
                                ) : null
                            }
                            { (state.image.width / state.tile.width).toFixed(2) } : 1
                        </Table.Cell>
                        <Table.Cell positive={ divisible.height ? true : false }>                            
                            {
                                divisible.height ? (
                                    <Icon name="check" color="green" />
                                ) : null
                            }
                            { (state.image.height / state.tile.height).toFixed(2) } : 1
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </Segment>
    );
};