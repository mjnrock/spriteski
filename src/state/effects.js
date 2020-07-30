import { EnumMessageType } from "./reducers";
// import { history } from "./../App";

export const effects = [
    function(state, msg) {
        if(msg.type === EnumMessageType.AUTO_SEQUENCER_COMPLETE) {
            //TODO This results in <Sequencer> not rendering its result until something forces an update.  Make it update out of the gate, or don't force a redirect.
            // history.push("/sequencer");
        }
    }
];