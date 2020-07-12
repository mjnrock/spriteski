import React, { useState, useEffect } from "react";
import { Grid, Image, Segment, Button } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive/lib/react";

import { Context } from "../App";
import Slider from "./Slider";

function TileSelectionGrid(props) {
    const { state } = useNodeContext(Context);
    const [ colWidth, setColWidth ] = useState(16);
    const [ selection, setSelection ] = useState([]);

    useEffect(() => {
        setSelection([]);
    }, [ colWidth ]);

    useEffect(() => {
        if(typeof props.onSelection === "function") {
            props.onSelection(selection);
        }
    }, [ props, selection ]);

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

    const highlights = rows.map(row => row.map(tile => {
        return selection.includes(tile);
    }));

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

    function updateSelection(typeOrTile, value) {
        let ret = new Set(selection);

        if(typeOrTile === "row" && value in rows) {
            const row = rows[ value ];

            if(row.every(tile => ret.has(tile))) {
                row.forEach(tile => ret.delete(tile));
            } else {
                row.forEach(tile => ret.add(tile));
            }
        } else if(typeOrTile === "col") {
            if(rows.every(row => row.some((tile, i) => value === i && ret.has(tile)))) {
                for(let row of rows) {
                    row.forEach((tile, i) => value === i ? ret.delete(tile) : null);
                }
            } else {                
                for(let row of rows) {
                    row.forEach((tile, i) => value === i ? ret.add(tile) : null);
                }
            }
        } else {
            if(ret.has(typeOrTile)) {
                ret.delete(typeOrTile);
            } else {
                ret.add(typeOrTile);
            }
        }

        setSelection([ ...ret ]);
    }

    return (
        <>
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
                        <Button
                            color={ selection.length === Object.keys(collection.tiles).length ? "blue" : null }
                            onClick={ e => setSelection(selection.length === Object.keys(collection.tiles).length ? [] : Object.values(collection.tiles)) }
                            style={{ fontSize: 16 }}
                        >*</Button>
                    </Grid.Column>
                    <Grid.Column width={ 15 } textAlign="left">
                        <Button.Group>
                            {
                                (rows[ 0 ] || []).map((val, i) => {
                                    const isColored = highlights.some(row => row.some((val, j) => val && i === j));
                                    const isBasic = isColored && !highlights.every(row => row.some((val, j) => val && i === j))

                                    return (
                                        <Button
                                            key={ i }
                                            basic={ isBasic }
                                            color={ isColored ? "blue" : null }
                                            onClick={ e => updateSelection("col", i) }
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
                            {
                                rows.map((row, i) => {
                                    const isColored = highlights[ i ].some(v => v);
                                    const isBasic = isColored && !highlights[ i ].every(v => v);

                                    return (
                                        <Button
                                            key={ i }
                                            basic={ isBasic }
                                            color={ isColored ? "blue" : null }
                                            onClick={ e => updateSelection("row", i) }
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

                                                const isSelected = selection.includes(tile);
                                                const label = {
                                                    label: {
                                                        basic: true,
                                                        floating: true,
                                                        color: isSelected ? "blue" : null,
                                                        content: (
                                                            <div>
                                                                <span>{ j }</span>
                                                                <br />
                                                                <span>{ i }</span>
                                                            </div>
                                                        )
                                                    }
                                                };

                                                return (
                                                    <Grid.Column key={ `${ tile.x }.${ tile.y }` }>
                                                        <Image
                                                            centered
                                                            style={ {
                                                                border: isSelected ? `4px solid #1678C2` : `1px solid rgba(0, 0, 0, 0.20)`,
                                                                margin: "auto",
                                                                boxShadow: "0 1px 2px 0 rgba(34,36,38,.3)",
                                                                borderRadius: 5,
                                                                cursor: "pointer"
                                                            }}
                                                            onClick={ e => updateSelection(tile) }
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

export default TileSelectionGrid;