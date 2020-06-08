import React, { useContext } from "react";
import { Table, Segment } from "semantic-ui-react";

import { Context } from "../App";

export default function Canvas(props) {
    const { state } = useContext(Context);

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
                        <Table.Cell>{ state.image.width }</Table.Cell>
                        <Table.Cell>{ state.image.height }</Table.Cell>
                        <Table.Cell>{ state.tile.width }</Table.Cell>
                        <Table.Cell>{ state.tile.height }</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </Segment>
    );
};