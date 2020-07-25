import { spawnStateNode } from "@lespantsfancy/hive";
import { reducers } from "./reducers";
import { effects } from "./effects";

import Tessellator from "./../util/tessellator/Tessellator";
import Collection from "./../util/Collection";
import Mixer from "../util/sequencer/Mixer";

const StateNode = spawnStateNode({
    tessellator: new Tessellator(128, 128),
    collection: new Collection(),
    mixer: new Mixer(),
}, reducers, effects);

export default StateNode;