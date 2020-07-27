import { spawnStateNode } from "@lespantsfancy/hive";
import { reducers } from "./reducers";
import { effects } from "./effects";

import Tessellator from "./../util/tessellator/Tessellator";
import TileCollection from "../util/TileCollection";
import Mixer from "../util/sequencer/Mixer";
import Configuration from "./../util/Configuration";

const StateNode = spawnStateNode({
    tessellator: new Tessellator(128, 128),
    collection: new TileCollection(),
    mixer: new Mixer(),
    config: new Configuration({
        options: {
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
        },
        state: {
            FirstRowDirection: "Southeast [135°]",
            CounterClockwise: 1,    //STUB  This won't assign properly until Configuration.set is updated, due to falsiness reasons
        }
    }),
}, reducers, effects);

StateNode.state.config.set("DirectionCount", 2);
// StateNode.state.config.set("FirstRowDirection", "Northeast [45°]");
console.log(StateNode.state.config)
console.log(StateNode.state.config.state)

export default StateNode;