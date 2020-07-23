import { spawnStateNode } from "@lespantsfancy/hive";
import { reducers } from "./reducers";
import { effects } from "./effects";

import Tessellator from "./../util/tessellator/Tessellator";
import Sequence from "./../util/sequencer/Sequence";
import Collection from "./../util/Collection";
import Mixer from "./../util/wip/Mixer";

const StateNode = spawnStateNode({
    tessellator: new Tessellator(128, 128),
    sequence: new Sequence(),
    collection: new Collection(),
    mixer: new Mixer(),
}, reducers, effects);

export default StateNode;