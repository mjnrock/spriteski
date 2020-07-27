import { spawnStateNode } from "@lespantsfancy/hive";
import { reducers } from "./reducers";
import { effects } from "./effects";

import Tessellator from "./../util/tessellator/Tessellator";
import TileCollection from "../util/TileCollection";
import Mixer from "../util/sequencer/Mixer";
import Configuration, { EnumEventType as EnumConfigEventType } from "./../util/Configuration";

const StateNode = spawnStateNode({
    tessellator: new Tessellator(128, 128),
    collection: new TileCollection(),
    mixer: new Mixer(),
    config: new Configuration({
        DirectionCount: [ 1, 4, 8 ],
        FirstRowDirection: [
            { "North [0°]": 0 },
            { "Northeast [45°]": 45 },
            { "East [90°]": 90 },
            { "Southeast [135°]": 135 },
            { "South [180°]": 180 },
            { "Southwest [225°]": 225 },
            { "West [270°]": 270 },
            { "Northwest [315°]": 315 },
        ],
        CounterClockwise: [ true, false ]
    }, {
        defaultsByKey: {
            FirstRowDirection: "Southeast [135°]",
        },
        defaultsByValue: {
            CounterClockwise: false,
        }
    }),
}, reducers, effects);

StateNode.state.config.on(EnumConfigEventType.UPDATE, console.log)
console.log(StateNode.state.config.setByKey("DirectionCount", 2));          //ASSERT: true (key=2 is a valid option)
console.log(StateNode.state.config.setByValue("CounterClockwise", 19));     //ASSERT: false (value=19 is not a valid option)

export default StateNode;