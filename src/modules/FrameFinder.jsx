import React, { useState } from "react";
import { Segment, Image, Grid, Input, Modal, Header, Button } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive";

import { Context } from "./../App";
import { EnumMessageType } from "./../reducers";

export default function FrameFinder({ children, ...rest } = {}) {
    const { node, state } = useNodeContext(Context);
    const [ isOrLogic, setIsOrLogic ] = useState(true);
    const [ input, setInput ] = useState("");
    const [ selections, setSelections ] = useState([]);

    function addToScore(x, y, frame) {
        node.dispatch(EnumMessageType.ADD_SEQUENCE_FRAME, {
            x,
            y,
            frame,
        });
    }

    let frames = state.frames,
        inputs = input.replace(/ +/g, " "),
        splits = inputs.split(" ");
    if(inputs.length) {
        const result = state.frames.filter(obj => {
            const allTags = [
                ...obj.tags,
                ...state.collection.tags,
            ];

            if(isOrLogic) {
                const tags = splits.filter(tag => tag.length ? allTags.some(t => t === tag) : true);

                return tags.length > 0;
            } else {
                return splits.every(tag => tag.length ? allTags.some(t => t === tag) : true);
            }
        });

        frames = result;
    }
    console.log(input, splits.length);

    return (
        <Modal trigger={ children } { ...rest }>
            <Modal.Content>
                <Segment>
                    <Button.Group fluid style={{ marginBottom: 16 }}>
                        <Button color={ isOrLogic ? "grey" : "blue" } onClick={ e => setIsOrLogic(false) }>And</Button>
                        <Button.Or text="<>" />
                        <Button color={ isOrLogic ? "blue" : "grey" } onClick={ e => setIsOrLogic(true) }>Or</Button>
                    </Button.Group>

                    <Input icon="search" fluid placeholder="Search frames..." autoFocus value={ input } onChange={ e => setInput(String(e.target.value).replace(/\s\s+/g, " ")) } />

                    <Segment color="blue" style={{ overflowY: "scroll", maxHeight: 600 }}>
                        <Grid columns={ 8 }>
                            {
                                frames.length ? frames.map(({ x, y, frame }) => {
                                    const key = `${ x }.${ y }`;
                                    const data = frame.toDataURL();
                                    const isSelected = selections.includes(key);
                                    const label = isSelected ? ({
                                            label: { corner: "left", icon: "check", color: "blue" }
                                        }) : {};
                                    
                                    return (
                                        <Grid.Column key={ key }>
                                            <Image
                                                centered
                                                style={ {
                                                    border: isSelected ? "2px solid #1678C2" : "1px solid rgba(34,36,38,.3)",
                                                    boxShadow: "0 1px 2px 0 rgba(34,36,38,.3)",
                                                    borderRadius: 5,
                                                    cursor: "pointer"
                                                }}
                                                onClick={ e => {
                                                    addToScore(x, y, frame);
                                                    
                                                    if(isSelected) {
                                                        setSelections(selections.filter(s => s !== key));
                                                    } else {
                                                        setSelections([
                                                            ...selections,
                                                            key
                                                        ]);
                                                    }
                                                }}
                                                src={ data }
                                                { ...label }
                                            />
                                        </Grid.Column>
                                    );
                                }) : (
                                    <Segment basic textAlign="center" style={{ margin: "auto" }}>
                                        <Header as="h2" textAlign="center" style={{ margin: "auto" }}>
                                            { state.frames.length ? "No Results" : "No Frames Loaded" }
                                        </Header>
                                    </Segment>
                                )
                            }
                        </Grid>
                    </Segment>
                </Segment>
            </Modal.Content>

            {
                selections.length ? (
                    <Modal.Actions>
                        <Button icon="check" color="blue" content="Add Frames" />
                    </Modal.Actions>   
                ) : null
            }         
        </Modal>
    );
};