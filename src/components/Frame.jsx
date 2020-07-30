/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useNodeContext } from "@lespantsfancy/hive/lib/react";
import { Icon } from "semantic-ui-react";

import { Context } from "./../App";
import { EnumMessageType } from "./../state/reducers";
import { ResizableBox } from "react-resizable";

export default React.memo(function Frame(props) {
    const { node } = useNodeContext(Context);
    const [ resize, setResize ] = useState(props.frame.duration);
    const [ duration, setDuration ] = useState(props.frame.duration);

    useEffect(() => {
        node.dispatch(EnumMessageType.RESIZE_FRAME, { frame: props.frame, duration });
    }, [ duration ]);

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
            onResize={ (e, { size }) => setResize(size.width / (512 / props.fps)) }
            onResizeStop={ (e, { size }) => setDuration(resize) }
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
}, function comparator(prevProps, nextProps) {
    return prevProps.frame.source === nextProps.frame.source;
});