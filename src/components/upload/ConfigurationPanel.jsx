import React from "react";
import { Form, Icon } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive/lib/react";

import { Context } from "../../App";
import { EnumMessageType } from "./../../state/reducers";

function ConfigurationPanel(props) {
    const { node, state } = useNodeContext(Context);

    function updateConfigByValue(key, value) {
        node.dispatch(EnumMessageType.UPDATE_CONFIGURATION, {
            method: "value",
            option: key,
            input: value,
        })
    }
    
    return (
        <Form>
            <Form.Group>
                {
                    Object.entries(state.config.options).map(([ key, value ]) => {
                        if((props.filter || []).includes(key)) {
                            return null;
                        }

                        if(Array.isArray(value)) {
                            if(value.length === 2 && value.every(v => typeof v === "boolean")) {
                                return (
                                    <Form.Checkbox
                                        key={ key }
                                        label={ key }
                                        checked={ !!state.config.value(key) }
                                        onChange={ (e, { checked }) => updateConfigByValue(key, checked) }
                                    />
                                );
                            }

                            return (
                                <Form.Dropdown
                                    scrolling
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
                                    value={ state.config.value(key) }
                                    onChange={ (e, { value }) => updateConfigByValue(key, value) }
                                />
                            );
                        } else if(typeof value === "object") {
                            return (
                                <Form.Dropdown
                                    scrolling
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
                                    value={ state.config.value(key) }
                                    onChange={ (e, { value }) => updateConfigByValue(key, value) }
                                />
                            );
                        }

                        return null;
                    })
                }
            </Form.Group>

            <Form.Button color="blue" onClick={ e => node.dispatch(EnumMessageType.AUTO_SEQUENCER_BEGIN) }>
                <Icon name="film" /> Run
            </Form.Button>
        </Form>
    );
}

export default ConfigurationPanel;