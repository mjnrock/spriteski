import React, { useState } from "react";
import { Table, Icon, Image } from "semantic-ui-react";
import Slider from "../components/Slider";

export default function FrameTableRow({ active, src, duration, maxFps, ...rest }) {
    const [ speed, setSpeed ] = useState(1);

    function adjustSpeed(e) {
        const target = e.target;

        if(target) {
            setSpeed(~~target.value);
        }
    }

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
                <Slider value={ speed } min={ 1 } max={ maxFps } onChange={ adjustSpeed } />
            </Table.Cell>
        </Table.Row>
    );
};