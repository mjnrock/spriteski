import React from "react";
import { Segment, Table, Icon, Image, Progress } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive";

import { Context } from "./../App";

export function TableRow({ active, src, duration, ...rest }) {
    return (
        <Table.Row { ...rest } textAlign="center" verticalAlign="middle">
            <Table.Cell width={ 1 }>
                {
                    active ? (
                        <Icon name="circle" color="green" />
                    ) : (
                        <Icon name="circle outline" />
                    )
                }
            </Table.Cell>

            <Table.Cell width={ 7 }>
                <Image
                    centered
                    style={{
                        border: "1px solid #000",
                        margin: "auto"
                    }}
                    src={ src }
                />
            </Table.Cell>

            <Table.Cell width={ 8 }>
                <Progress percent={ duration } color="blue" size="large" active style={{ margin: "auto" }} />
            </Table.Cell>
        </Table.Row>
    );
};

export default function Sequencer() {
    const { state } = useNodeContext(Context);

    return (
        <Segment>
            <Table>
                <Table.Header>
                    <Table.Row textAlign="center">
                        <Table.HeaderCell width={ 1 }>
                            <Icon name="adjust" />
                        </Table.HeaderCell>

                        <Table.HeaderCell width={ 7 }>
                            <Icon name="image" />
                        </Table.HeaderCell>

                        <Table.HeaderCell width={ 8 }>
                            <Icon name="clock outline" />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        state.frames.map(({ x, y, frame, tags }) => {
                            const key = `${ x }.${ y }`;
                            
                            return (
                                <TableRow
                                    key={ key }
                                    active={ false }
                                    src={ frame.toDataURL() }
                                    duration={ Math.round(Math.random() * 100) }
                                />
                            );
                        })
                    }
                </Table.Body>
            </Table>
        </Segment>
    );
};