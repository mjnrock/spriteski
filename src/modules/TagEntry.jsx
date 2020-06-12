import React, { useState, useEffect } from "react";
import { Input, Label, Icon, Grid } from "semantic-ui-react";

function TagEntry(props) {
    const [ tags, setTags ] = useState(props.tags || []);

    useEffect(() => {
        if(typeof props.onTag === "function") {
            props.onTag(tags);
        }
        // eslint-disable-next-line
    }, [ tags ]);

    function editTags(e) {
        const value = e.target.value;

        if(e.which === 13) {
            if(value.length && !tags.includes(value)) {
                setTags([
                    ...tags,
                    value
                ]);
            }

            e.target.value = "";
        }
    }

    function removeTag(tag) {
        setTags(tags.filter(t => t !== tag));
    }

    return (
        <>
            <Grid>
                <Grid.Column>
                    <Grid.Row style={{ marginBottom: 8 }}>
                        {
                            tags.map(tag => (
                                <Label color="blue" image key={ tag } style={{ marginBottom: 4 }}>
                                    { tag }
                                    <Icon name="delete" onClick={ e => removeTag(tag) } />
                                </Label>
                            ))
                        }
                    </Grid.Row>

                    <Grid.Row>
                        <Input fluid placeholder="Enter tags..." onKeyUp={ editTags } />
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        </>
    );
}

export default TagEntry;