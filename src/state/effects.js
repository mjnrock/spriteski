import { EnumMessageType } from "./reducers";
import { history } from "./../App";

export const effects = [
    function(state, msg) {
        if(msg.type === EnumMessageType.AUTO_SEQUENCER_COMPLETE) {
            history.push("/sequencer");
        }
    }
];