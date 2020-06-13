import React, { useState, useEffect } from "react";
import { Table, Icon, Image, Button } from "semantic-ui-react";
import Slider from "../components/Slider";

export default function FrameTableRow({ active, src, duration, maxFps, onAdjustSpeed, onDelete, ...rest }) {
    const [ speed, setSpeed ] = useState(duration);

    useEffect(() => {
        if(speed > maxFps) {
            setSpeed(maxFps);
        }
    }, [ speed, maxFps ]);

    function adjustSpeed(value) {
        if(typeof onAdjustSpeed === "function") {
            onAdjustSpeed(value);
        }
        setSpeed(value);
    }

    return (
        <Table.Row { ...rest } textAlign="center" verticalAlign="middle" active={ active }>
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

            <Table.Cell width={ 7 }>
                <Slider value={ speed } min={ 1 } max={ maxFps } onChange={ adjustSpeed } />
            </Table.Cell>

            <Table.Cell width={ 1 }>
                <Button icon color="red" onClick={ onDelete }>
                    <Icon name="trash" />
                </Button>
            </Table.Cell>
        </Table.Row>
    );
};