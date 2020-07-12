import React, { useState, useEffect } from "react";
import { Grid, Input } from "semantic-ui-react";

export default function Slider(props) {    
    const [ value, setValue ] = useState(props.value || props.defaultValue || 0);
    const val = props.value === void 0 || props.value === null ? value : props.value || props.defaultValue ;

    useEffect(() => {
        if(typeof props.onChange === "function") {
            props.onChange(value);
        }
        //eslint-disable-next-line
    }, [ value ]);

    if(props.label) {
        return (
            <Grid style={ props.style || {} }>
                <Grid.Row textAlign="center" verticalAlign="middle">
                    <Grid.Column width={ 3 }>
                        { props.label }
                    </Grid.Column>

                    <Grid.Column width={ 9 }>
                        <input className="slider" type="range" min={ props.min } max={ props.max } value={ val } onChange={ e => setValue(~~e.target.value) } />
                    </Grid.Column>
                    
                    <Grid.Column width={ 4 }>
                        <Input className="slider-value" type="number" min={ props.min } max={ props.max } value={ val } onChange={ e => setValue(~~e.target.value) } />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    return (
        <Grid style={ props.style || {} }>
            <Grid.Row>
                <Grid.Column width={ 10 }>
                    <input className="slider" type="range" min={ props.min } max={ props.max } value={ val } onChange={ e => setValue(~~e.target.value) } />
                </Grid.Column>
                
                <Grid.Column width={ 6 }>
                    <Input className="slider-value" type="number" min={ props.min } max={ props.max } value={ val } onChange={ e => setValue(~~e.target.value) } />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}