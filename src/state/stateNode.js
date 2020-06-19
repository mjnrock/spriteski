import { spawnStateNode } from "@lespantsfancy/hive";
import { reducers } from "./reducers";
import { effects } from "./effects";

import Tessellator from "./../util/Tessellator";
import Sequence from "./../util/Sequence";

const StateNode = spawnStateNode({
    tessellator: new Tessellator(128, 128),
    sequence: new Sequence(),
}, reducers, effects);

export default StateNode;