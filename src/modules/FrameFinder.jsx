import React, { useState } from "react";
import { Segment, Image, Grid, Input, Modal, Header, Button, Label, Table, Icon } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive";

import { Context } from "./../App";
import { EnumMessageType } from "./../reducers";

export default function FrameFinder({ children, opener, open, ...rest } = {}) {
    const { node, state } = useNodeContext(Context);
    const [ isOrLogic, setIsOrLogic ] = useState(true);
    const [ input, setInput ] = useState("");
    const [ selections, setSelections ] = useState([]);
    const [ contextMenuTarget, setContextMenuTarget ] = useState();

    function addSelectedFrames() {
        for(let selection of selections) {
            const [ x, y ] = selection.split(".");
            const [ frame ] = state.frames.filter(obj => obj.x === ~~x && obj.y === ~~y);

            if(frame) {
                node.dispatch(EnumMessageType.ADD_SEQUENCE_FRAME, {
                    x: ~~x,
                    y: ~~y,
                    frame: frame.frame,
                });
            }
        }

        if(typeof opener === "function") {
            opener(false);
        }
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

    return (
        <Modal trigger={ children } { ...rest } open={ open }>
            <Modal.Content>
                <Segment>
                    <Button.Group fluid style={{ marginBottom: 16 }}>
                        <Button color={ isOrLogic ? "grey" : "blue" } onClick={ e => setIsOrLogic(false) }>And</Button>
                        <Button.Or text="<>" />
                        <Button color={ isOrLogic ? "blue" : "grey" } onClick={ e => setIsOrLogic(true) }>Or</Button>
                    </Button.Group>

                    <Input icon="search" fluid placeholder="Search frames..." autoFocus value={ input } onChange={ e => setInput(String(e.target.value).replace(/\s\s+/g, " ")) } />

                    {
                        contextMenuTarget ? (
                            <div style={{ marginTop: 14, marginBottom: 14 }}>
                                <Table color="teal">
                                    <Table.Header>
                                        <Table.Row textAlign="center">
                                            <Table.HeaderCell>
                                                <Icon name="location arrow" />
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                <Icon name="tags" />
                                            </Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        <Table.Row textAlign="center">
                                            <Table.Cell>{ contextMenuTarget.x }, { contextMenuTarget.y }</Table.Cell>
                                            <Table.Cell>{
                                                contextMenuTarget.tags.map(tag => (
                                                    <Label key={ tag } color="blue">{ tag }</Label>
                                                ))
                                            }</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                                
                                <Button icon labelPosition="left" color="grey" onClick={ e => setContextMenuTarget() }>
                                    <Icon name="hide" />
                                    Hide Details
                                </Button>
                            </div>
                        ) : null
                    }

                    <Segment color="blue" style={{ overflowY: "scroll", maxHeight: 600 }}>
                        <Grid columns={ 8 }>
                            {
                                frames.length ? frames.map(obj => {
                                    const { x, y, frame } = obj;
                                    const key = `${ x }.${ y }`;
                                    const data = frame.toDataURL();
                                    const isSelected = selections.includes(key);
                                    const isContextMenu = contextMenuTarget && obj.x === contextMenuTarget.x && obj.y === contextMenuTarget.y;
                                    const label = isSelected ? ({
                                            label: { corner: "left", icon: "check", color: "blue" }
                                        }) : (isContextMenu ? ({
                                            label: { corner: "left", icon: "target", color: "teal" }
                                        }) : {});
                                    
                                    return (
                                        <Grid.Column key={ key }>
                                            <Image
                                                centered
                                                style={ {
                                                    border: isSelected ? "2px solid #1678C2" : (isContextMenu ? "2px solid #009C95" : "1px solid rgba(34,36,38,.3)"),
                                                    boxShadow: "0 1px 2px 0 rgba(34,36,38,.3)",
                                                    borderRadius: 5,
                                                    cursor: "pointer"
                                                }}
                                                onClick={ e => {                                                    
                                                    if(isSelected) {
                                                        setSelections(selections.filter(s => s !== key));
                                                    } else {
                                                        setSelections([
                                                            ...selections,
                                                            key
                                                        ]);
                                                    }
                                                }}
                                                onContextMenu={ e => {
                                                    e.preventDefault();

                                                    if(isContextMenu) {
                                                        setContextMenuTarget();
                                                    } else {
                                                        setContextMenuTarget(obj);
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
                        <Button icon="check" color="blue" content="Add Frames" onClick={ addSelectedFrames } />
                    </Modal.Actions>   
                ) : null
            }         
        </Modal>
    );
};