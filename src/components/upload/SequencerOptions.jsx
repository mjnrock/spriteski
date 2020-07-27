import React, { Fragment } from "react";
import { Form, Header } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive/lib/react";

import { Context } from "../../App";

function SequencerOptions() {
    // eslint-disable-next-line
    const { node, state } = useNodeContext(Context);
    
    return (
        <Fragment>
            <Header as="h4" color="grey" textAlign="center">
                <Header.Content>Sequencer Options</Header.Content>
            </Header>

            <Form>
                <Form.Group>
                    {/* //TODO The options presented here should be seede from a higher abstraction so that the entire "options package" is stateable, with these as dispatches */}
                    {/* <Form.Dropdown
                        label="DirectionCount"
                        labeled={ true }
                        options={[
                            { key: 1, text: "One [1]", value: 1 },
                            { key: 4, text: "Four [4]", value: 4 },
                            { key: 8, text: "Eight [8]", value: 8 },
                        ]}
                        defaultValue={ 8 }
                    />
                    <Form.Dropdown
                        label="FirstRowDirection"
                        labeled={ true }
                        options={[
                            { key: 0, text: "North [0°]", value: 0 },
                            { key: 45, text: "Northeast [45°]", value: 45 },
                            { key: 90, text: "East [90°]", value: 90 },
                            { key: 135, text: "Southeast [135°]", value: 135 },
                            { key: 180, text: "South [180°]", value: 180 },
                            { key: 225, text: "Southwest [225°]", value: 225 },
                            { key: 270, text: "West [270°]", value: 270 },
                            { key: 315, text: "Northwest [315°]", value: 315 },
                        ]}
                        defaultValue={ 0 }
                    />
                    <Form.Checkbox label="CounterClockwise" /> */}
                    {
                        Object.entries(state.config.options).map(([ key, value ]) => {
                            if(Array.isArray(value)) {
                                if(value.length === 2 && value.every(v => typeof v === "boolean")) {
                                    return (
                                        <Form.Checkbox key={ key } label={ key } defaultChecked={ !!value[ 1 ] } onChange={ console.log } />
                                    );
                                }

                                return (
                                    <Form.Dropdown
                                        key={ key }
                                        label={ key }
                                        labeled={ true }
                                        options={
                                            value.map((v, i) => ({
                                                key: i,
                                                text: v,
                                                value: v,
                                            }))
                                        }
                                        defaultValue={ state.config.options[ key ][ 0 ] }
                                    />
                                );
                            } else if(typeof value === "object") {
                                return (
                                    <Form.Dropdown
                                        key={ key }
                                        label={ key }
                                        labeled={ true }
                                        options={
                                            Object.entries(value).map(([ k, v ]) => ({
                                                key: k,
                                                text: k,
                                                value: v,
                                            }))
                                        }
                                        defaultValue={ state.config.first(key)[ 1 ] }
                                    />
                                );
                            }
                        })
                    }
                </Form.Group>
            </Form>
        </Fragment>
    );
}

export default SequencerOptions;