import React, { useContext } from "react";
import { Table } from "semantic-ui-react";

import { Context } from "./../App";

export default function Canvas(props) {
    const { state } = useContext(Context);

    return (
        <Table celled structured verticalAlign="middle" textAlign="center">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Width</Table.HeaderCell>
                    <Table.HeaderCell>Height</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    <Table.Cell>{ state.image.width }</Table.Cell>
                    <Table.Cell>{ state.image.height }</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
};