/* eslint-disable */
import React, { useState } from "react";
import { Segment } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive/lib/react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { Context } from "./../App";

export default function Sequencer() {
    const { node, state } = useNodeContext(Context);
    const [ list, setList ] = useState([ { id: "0", content: "A" }, { id: "1", content: "B" }, { id: "2", content: "C" }, { id: "3", content: "D" } ]);

    function onDragEnd(result) {
        const { source, destination } = result;

        if(!destination) {
            return;
        }

        if(source.droppableId === destination.droppableId) {
            let tempList = [ ...list ];

            const [ removed ] = tempList.splice(source.index, 1);
            tempList.splice(destination.index, 0, removed);

            setList(tempList);
        } else {
            //  Different droppable
        }
    }

    return (
        <Segment>
            <DragDropContext onDragEnd={ onDragEnd }>
                <Droppable droppableId={ "drop-0" }>
                    { (provided, snapshot) => (
                        <div
                            ref={ provided.innerRef }
                        >
                            { list.map((item, index) => (
                                <Draggable
                                    key={ item.id }
                                    draggableId={ item.id }
                                    index={ index }>
                                    { (provided, snapshot) => (
                                        <div
                                            ref={ provided.innerRef }
                                            { ...provided.draggableProps }
                                            { ...provided.dragHandleProps }
                                        >
                                            { item.content }
                                        </div>
                                    ) }
                                </Draggable>
                            )) }
                            { provided.placeholder }
                        </div>
                    ) }
                </Droppable>
            </DragDropContext>
        </Segment>
    );
};