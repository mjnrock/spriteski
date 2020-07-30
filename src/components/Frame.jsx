/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useNodeContext } from "@lespantsfancy/hive/lib/react";
import { Icon } from "semantic-ui-react";

import { Context } from "./../App";
import { EnumMessageType } from "./../state/reducers";
import { ResizableBox } from "react-resizable";

export default function Frame(props) {
    const { node } = useNodeContext(Context);
    const [ resize, setResize ] = useState(props.frame.duration);
    const [ duration, setDuration ] = useState(props.frame.duration);
    const [ color, setColor ] = useState(props.isSelected ? "yellow" : "grey");

    useEffect(() => {
        setColor(props.isSelected ? "yellow" : "grey");
    }, [ props.isSelected ]);

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
                    color={ color }
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
            onMouseDown={ e => props.track.move(~~props.index) }
        >
            <Icon
                name="content"
                color={ color }
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
                color={ color }
                style={{
                    position: "absolute",
                    top: -2,
                    right: -4,
                    cursor: "pointer",
                }}
            />

            <span
                style={{
                    color: color === "yellow" ? "#fbbd08" : "#767676",
                    fontFamily: "monospace",
                    position: "absolute",
                    bottom: -2,
                    right: 4,
                    cursor: "pointer",
                }}
            >{ ~~props.frame.duration }</span>

            <img 
                width={ 128 }
                height={ 128 }
                src={ props.frame.source }
            />
        </ResizableBox>
    );
}


// export default React.memo(function Frame(props) {
//     const { node } = useNodeContext(Context);
//     const [ resize, setResize ] = useState(props.frame.duration);
//     const [ duration, setDuration ] = useState(props.frame.duration);
//     const [ color, setColor ] = useState(props.isSelected ? "yellow" : "grey");

//     useEffect(() => {
//         setColor(props.isSelected ? "yellow" : "grey");
//     }, [ props.isSelected ]);

//     useEffect(() => {
//         node.dispatch(EnumMessageType.RESIZE_FRAME, { frame: props.frame, duration });
//     }, [ duration ]);

//     return (
//         <ResizableBox
//             className="frame-resizer"
//             axis="x"
//             width={ (props.frame.duration / props.fps) * 512 }
//             height={ 136 }
//             minConstraints={ [ 512 / props.fps, 136 ]}
//             maxConstraints={ [ 512, 136 ]}
//             handle={
//                 <Icon
//                     name="ellipsis vertical"
//                     color={ color }
//                     style={{
//                         position: "absolute",
//                         top: "50%",
//                         right: -4,
//                         marginTop: -4,
//                         cursor: "ew-resize",
//                     }}
//                 />
//             }
//             handleSize={ [ 8, 8 ] }
//             draggableOpts={{ grid: [ 512 / props.fps, 512 / props.fps ] }}
//             onResize={ (e, { size }) => setResize(size.width / (512 / props.fps)) }
//             onResizeStop={ (e, { size }) => setDuration(resize) }
//             onMouseDown={ e => props.track.move(~~props.index) }
//         >
//             <Icon
//                 name="content"
//                 color={ color }
//                 style={{
//                     position: "absolute",
//                     top: "50%",
//                     left: 4,
//                     marginTop: -4,
//                 }}
//                 { ...props.dragHandleProps }
//             />
            
//             <Icon
//                 name="x"
//                 color={ color }
//                 style={{
//                     position: "absolute",
//                     top: -2,
//                     right: -4,
//                     cursor: "pointer",
//                 }}
//             />

//             <img 
//                 width={ 128 }
//                 height={ 128 }
//                 src={ props.frame.source }
//             />
//         </ResizableBox>
//     );
// }, function comparator(prevProps, nextProps) {
//     return prevProps.frame.source === nextProps.frame.source && prevProps.isSelected === prevProps.isSelected && prevProps.index === prevProps.index;
// });