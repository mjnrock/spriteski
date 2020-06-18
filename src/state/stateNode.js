import { spawnStateNode } from "@lespantsfancy/hive";
import { reducers } from "./reducers";

import Tessellator from "./../util/Tessellator";
import Sequence from "./../util/Sequence";

const StateNode = spawnStateNode({
    tessellator: new Tessellator(),
    sequence: new Sequence(),
}, ...reducers);

export default StateNode;