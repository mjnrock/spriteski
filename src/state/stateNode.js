import { spawnStateNode } from "@lespantsfancy/hive";
import { reducers } from "./reducers";
import { effects } from "./effects";

import Tessellator from "./../util/tessellator/Tessellator";
import TileCollection from "../util/TileCollection";
// // import Sequencer from "../util/sequencer/Sequencer";
import Mixer from "../util/sequencer/Mixer";
import Configuration, { EnumEventType as EnumConfigEventType } from "./../util/Configuration";

const StateNode = spawnStateNode({
    tessellator: new Tessellator(128, 128),
    collection: new TileCollection(),
    mixer: new Mixer(),
    config: new Configuration({
        DirectionCount: [ 1, 4, 8 ],
        FirstRowDirection: {
            "North [0°]": 0,
            "Northeast [45°]": 45,
            "East [90°]": 90,
            "Southeast [135°]": 135,
            "South [180°]": 180,
            "Southwest [225°]": 225,
            "West [270°]": 270,
            "Northwest [315°]": 315,
        },
        CounterClockwise: [ true, false ],
        FPS: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30 ],
        Algorithm: [
            "Entity.State",
        ]
    }, {
        defaultsByKey: {
            FirstRowDirection: "North [0°]",
        },
        defaultsByValue: {
            DirectionCount: 8,
            CounterClockwise: false,
            Algorithm: "Entity.State",
            FPS: 16,
        }
    }),
}, reducers, effects);

//  STUB
StateNode.state.config.on(EnumConfigEventType.UPDATE, console.log)

export default StateNode;