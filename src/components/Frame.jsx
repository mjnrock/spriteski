/* eslint-disable */
import React, { useState } from "react";
import { Icon } from "semantic-ui-react";

import { ResizableBox } from 'react-resizable';

//TODO Visually make the "base unit" minimum width be 1/2 of the tile width, while the max should be 2x the tile width, via a desginated "zoom" slider (e.g. 1 unit = 1/8 note, 1/2 note, etc.)

export default function Frame(props) {
    const [ pixels, setPixels ] = useState((props.frame.duration / props.fps) * 512);

    return (
        <ResizableBox
            className="frame-resizer"
            axis="x"
            width={ (props.frame.duration / props.fps) * 512 }
            height={ 136 }
            minConstraints={ [ 512 / props.fps, 136 ]}
            maxConstraints={ [ 512, 136 ]}
            handle={
                <Icon
                    name="ellipsis vertical"                
                    color="grey"
                    style={{
                        position: "absolute",
                        top: "50%",
                        right: -4,
                        marginTop: -4,
                        cursor: "ew-resize",
                    }}
                />
            }
            handleSize={ [ 8, 8 ] }
            draggableOpts={{ grid: [ 512 / props.fps, 512 / props.fps ] }}
            onResize={ (e, { size }) => setPixels(size.width / (512 / props.fps)) }
            >
            <Icon
                name="content"
                color="grey"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: 4,
                    marginTop: -4,
                }}
                { ...props.dragHandleProps }
            />
            
            <Icon
                name="x"
                color="grey"
                style={{
                    position: "absolute",
                    top: -2,
                    right: -4,
                    cursor: "pointer",
                }}
            />

            <img 
                width={ 128 }
                height={ 128 }
                src={ props.frame.source }
            />
        </ResizableBox>
    );
}