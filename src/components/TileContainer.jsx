import React, { useState, useEffect } from "react";
import { Grid, Image, Segment, Button } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive/lib/react";

import { Context } from "./../App";
import { EnumMessageType } from "./../state/reducers";
import TagEntry from "./TagEntry";
import Slider from "./Slider";

function TileContainer() {
    const { node, state } = useNodeContext(Context);
    const [ colWidth, setColWidth ] = useState(16);
    const [ selection, setSelection ] = useState([]);
    const [ activeRows, setActiveRows ] = useState([]);
    const [ activeCols, setActiveCols ] = useState([]);

    useEffect(() => {
        setActiveCols([]);
        setActiveRows([]);
        setSelection([]);
    }, [ colWidth ]);

    // function onTileTag(x, y, tags) {
    //     node.dispatch(EnumMessageType.TILE_TAG, {
    //         x,
    //         y,
    //         tags,
    //     });
    // }
    function onCollectionTag(tags) {
        if(tags.toString() !== state.collection.tags.toString()) {
            node.dispatch(EnumMessageType.COLLECTION_TAG, tags);
        }
    }

    // function deleteTile(x, y) {
    //     node.dispatch(EnumMessageType.DELETE_TILE, {
    //         x,
    //         y,
    //     });
    // }

    const collection = state.collection;

    const rows = [];
    let inc = 0;
    Object.entries(collection.tiles).forEach(([ key, tile ], i) => {
        if(inc % colWidth === 0) {
            rows.push([]);
        }
        const row = rows[ Math.floor(i / colWidth) ];

        row.push(tile);

        inc++;
    });

    const buttons = [
        [ "n1", 1 ],
        [ "n2", 2 ],
        [ "n4", 4 ],
        [ "n8", 8 ],
        [ "n16", 16 ],
    ];

    if(!rows.length) {
        return (
            <Segment>The current Collection is empty</Segment>
        );
    }

    return (
        <>
            <Segment basic>
                <TagEntry onTag={ onCollectionTag } tags={ state.collection.tags } />
            </Segment>

            <Button.Group fluid style={{ marginBottom: 16 }}>
                {
                    buttons.map(([ label, value ], i) => (
                        <Button key={ i } active={ colWidth === value } basic={ colWidth !== value } color="blue" onClick={ e => setColWidth(value) }>{ label }</Button>
                    ))
                }
            </Button.Group>
            <Slider label="Columns" min={ 1 } max={ 16 } defaultValue={ 8 } value={ colWidth } onChange={ value => setColWidth(value || 1) } />

            <Grid columns={ 2 }>
                <Grid.Row>
                    <Grid.Column width={ 1 }>
                        {/* <Button
                            icon
                            visible={ activeCols.length || activeRows.length || selection.length }
                            onClick={ e => {
                                console.log(activeCols)
                                console.log(activeRows)
                                console.log(selection)

                                let tiles = new Set([]);
                                for(let col of activeCols) {
                                    for(let row = 0; row < rows.length; row++) {
                                        tiles.add([ row, col ]);
                                    }
                                }
                                
                                for(let row of activeRows) {
                                    for(let col = 0; col < rows[ row ].length; col++) {
                                        tiles.add([ row, col ]);
                                    }
                                }
                                
                                for(let [ x, y ] of selection) {
                                    tiles.add([ x, y ]);
                                }

                                node.dispatch(EnumMessageType.DELETE_TILE, [ ...tiles ]);
                            }}
                        >
                            <Icon name="trash" />
                        </Button> */}
                    </Grid.Column>
                    <Grid.Column width={ 15 }>
                        <Button.Group>
                            <Button
                                color={ activeCols.length === (rows[ 0 ] || []).length ? "blue" : "grey" }
                                onClick={ e => setActiveCols(activeCols.length === (rows[ 0 ] || []).length ? [] : (rows[ 0 ] || []).map((tile, i) => i)) }
                                style={{ fontSize: 16 }}
                            >*</Button>
                            {
                                (rows[ 0 ] || []).map((tile, i) => {
                                    const index = activeCols.indexOf(i);

                                    return (
                                        <Button
                                            key={ i }
                                            color={ index >= 0 ? "blue" : null }
                                            onClick={ e => {
                                                if(index >= 0) {
                                                    setActiveCols(activeCols.filter(col => col !== i));
                                                } else {
                                                    setActiveCols([
                                                        ...activeCols,
                                                        i
                                                    ]);
                                                }
                                            }}
                                        >{ i }</Button>
                                    );
                                })
                            }
                        </Button.Group>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={ 1 }>
                        <Button.Group vertical>
                            <Button
                                color={ activeRows.length === rows.length ? "blue" : "grey" }
                                onClick={ e => setActiveRows(activeRows.length === rows.length ? [] : rows.map((row, i) => i)) }
                                style={{ fontSize: 16 }}
                            >*</Button>
                            {
                                rows.map((row, i) => {
                                    const index = activeRows.indexOf(i);

                                    return (
                                        <Button
                                            key={ i }
                                            color={ index >= 0 ? "blue" : null }
                                            onClick={ e => {
                                                if(index >= 0) {
                                                    setActiveRows(activeRows.filter(col => col !== i));
                                                } else {
                                                    setActiveRows([
                                                        ...activeRows,
                                                        i
                                                    ]);
                                                }
                                            }}
                                        >{ i }</Button>
                                    );
                                })
                            }
                        </Button.Group>
                    </Grid.Column>
                    <Grid.Column width={ 15 }>
                        <Grid columns={ colWidth }>
                            {
                                rows.map((row, i) => (
                                    <Grid.Row key={ i }>
                                        {
                                            row.map((tile, j) => {
                                                if(!tile) {
                                                    return null;
                                                }

                                                const isSelected = activeCols.includes(j) || activeRows.includes(i) || selection.some(sel => sel.toString() === [ i, j ].toString());
                                                const label = isSelected ? {
                                                    label: { corner: "left", icon: "check", color: "blue", size: "mini" }
                                                } : {};

                                                return (
                                                    <Grid.Column key={ `${ tile.x }.${ tile.y }`}>
                                                        <Image
                                                            centered
                                                            style={ {
                                                                border: isSelected ? `2px solid #1678C2` : `1px solid #000`,
                                                                margin: "auto",
                                                                boxShadow: "0 1px 2px 0 rgba(34,36,38,.3)",
                                                                borderRadius: 5,
                                                                cursor: "pointer"
                                                            }}
                                                            onClick={ e => {
                                                                if(selection.some(sel => sel.toString() === [ i, j ].toString())) {
                                                                    setSelection(selection.filter(row => row.toString() !== [ i, j ].toString()));
                                                                } else {
                                                                    setSelection([
                                                                        ...selection,
                                                                        [ i, j ]
                                                                    ]);
                                                                }
                                                            }}
                                                            src={ tile.canvas.toDataURL() }
                                                            { ...label }
                                                        />
                                                    </Grid.Column>
                                                );
                                            })
                                        }
                                    </Grid.Row>
                                ))
                            }
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    );
}

export default TileContainer;