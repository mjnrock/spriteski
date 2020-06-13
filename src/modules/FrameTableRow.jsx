import React from "react";
import { Table, Icon, Image, Progress } from "semantic-ui-react";

export default function FrameTableRow({ active, src, duration, ...rest }) {
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