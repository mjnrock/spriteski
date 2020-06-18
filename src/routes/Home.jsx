import React, { useState, useEffect } from "react";
import { Segment } from "semantic-ui-react";

import Tessellator from "./../util/Tessellator";
// import Sequence from "./util/Sequence";

import Canvas from "./../modules/Canvas";

const data64 = "data:image/png;base64,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";
const tesl = new Tessellator(64, 64, { source: data64 });

//TODO The <Tessellator> appears to work (at least basically), so start first by rewriting the tessllation code in React to utilize <Tessellator>
//TODO Once tessellation has been refactors, begin work on the <Sequence>
//TODO Once the sequencer has been refactors, begin the <Score> work

function Home() {
    const [ canvas, setCanvas ] = useState();

    useEffect(() => {
        if(tesl.canvas !== canvas) {
            tesl.draw(data64).then(({ canvas, tiles }) => {
                setCanvas(canvas)
            });
        }
        // eslint-disable-next-line
    }, [ tesl, canvas ]);

    return (
        <Segment>
            <Canvas src={ canvas } />
        </Segment>
    );
}

export default Home;