import React from "react";
import { Table, Segment, Icon } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive/lib/react";

import { Context } from "../App";

export default function Canvas(props) {
    const { state } = useNodeContext(Context);

    const divisible = {
        width: (state.tessellator.image.width % state.tessellator.config.width) === 0,
        height: (state.tessellator.image.height % state.tessellator.config.height) === 0,
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
                            { state.tessellator.image.width.toLocaleString() }
                        </Table.Cell>
                        <Table.Cell>
                            { state.tessellator.image.height.toLocaleString() }
                        </Table.Cell>
                        <Table.Cell>
                            { state.tessellator.config.width.toLocaleString() }
                        </Table.Cell>
                        <Table.Cell>
                            { state.tessellator.config.height.toLocaleString() }
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell colSpan="2">{ (state.tessellator.image.width * state.tessellator.image.height).toLocaleString() } px</Table.Cell>
                        <Table.Cell positive={ divisible.width ? true : false }>                            
                            {
                                divisible.width ? (
                                    <Icon name="check" color="green" />
                                ) : null
                            }
                            <span style={{ fontWeight: "bold" }}>{ (state.tessellator.image.width / state.tessellator.config.width).toFixed(2) }</span> : 1.00
                        </Table.Cell>
                        <Table.Cell positive={ divisible.height ? true : false }>                            
                            {
                                divisible.height ? (
                                    <Icon name="check" color="green" />
                                ) : null
                            }
                            <span style={{ fontWeight: "bold" }}>{ (state.tessellator.image.height / state.tessellator.config.height).toFixed(2) }</span> : 1.00
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </Segment>
    );
};