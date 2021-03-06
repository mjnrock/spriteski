// import Frame from "./../util/sequencer/Frame";

export const EnumMessageType = {
    UPLOAD_IMAGE: "UPLOAD_IMAGE",
    TILE_SIZE: "TILE_SIZE",
    UPDATE_CONFIGURATION: "UPDATE_CONFIGURATION",
    AUTO_SEQUENCER_BEGIN: "AUTO_SEQUENCER_BEGIN",
    AUTO_SEQUENCER_COMPLETE: "AUTO_SEQUENCER_COMPLETE",
    NAME_SEQUENCE: "NAME_SEQUENCE",
    BAKE_SEQUENCE: "BAKE_SEQUENCE",

    UPDATE_TRACK_FPS: "UPDATE_TRACK_FPS",
    REORDER_TRACK: "REORDER_TRACK",
    REMOVE_TRACK: "REMOVE_TRACK",

    RESIZE_FRAME: "RESIZE_FRAME",
    REORDER_FRAME: "REORDER_FRAME",
    RETRACK_FRAME: "RETRACK_FRAME",
    REMOVE_FRAME: "REMOVE_FRAME",
};

//TODO Eventually move this to whatever class becomes the "Sequencer facilitator" wrapper
export const SequenceAlgorithms = {
    "Entity.State": function(state, config) {
        //TODO Perform the calculations and send to the Sequence GUI
        state.tessellator.tessellate().then(tiles => {
            state.collection.tiles = tiles;

            const bounds = state.tessellator.bounds;
            for(let i = bounds.y; i < config.value("DirectionCount"); i++) {
                const track = state.sequencer.mixer.newTrack({ fps: config.value("FPS"), tw: state.tessellator.config.width, th: state.tessellator.config.height });

                for(let j = bounds.x; j < bounds.w; j++) {
                    track.add(state.tessellator.get(j, i).toDataURL(), 1);
                }
            }
        }).then(() => {
            setTimeout(() => {
                this.dispatch(EnumMessageType.AUTO_SEQUENCER_COMPLETE);
            }, 0);
        });
    }
}

export const reducers = [
    [ EnumMessageType.UPLOAD_IMAGE, function(state, msg) {
        const data = msg.payload || {};
        
        state.tessellator.setImage(data);

        return state;
    }],
    [ EnumMessageType.UPDATE_CONFIGURATION, function(state, msg) {
        const { method, option, input } = msg.payload || {};
        
        state.config.set(method, option, input);

        return state;
    }],
    [ EnumMessageType.AUTO_SEQUENCER_BEGIN, function(state, msg) {
        state.config.run(this);

        return state;
    }],
    [ EnumMessageType.AUTO_SEQUENCER_COMPLETE, function(state, msg) {
        state.config.setByValue("isSequencing", false);

        return state;
    }],
    [ EnumMessageType.BAKE_SEQUENCE, function(state, msg) {        
        state.sequencer.bake();

        return state;
    }],
    [ EnumMessageType.NAME_SEQUENCE, function(state, msg) {   
        const data = msg.payload || "";

        state.sequencer.rename(data);

        return state;
    }],
    [ EnumMessageType.UPDATE_TRACK_FPS, function(state, msg) {
        const { track, fps } = msg.payload || {};

        track.fps = fps;
        
        return state;
    }],
    [ EnumMessageType.TILE_SIZE, function(state, msg) {
        const { width, height } = msg.payload || {};

        state.tessellator.resize(width, height);

        return state;
    }],
    [ EnumMessageType.REORDER_TRACK, function(state, msg) {
        const { left, right } = msg.payload || {};

        state.sequencer.mixer.reorder(left, right);

        return state;
    }],
    [ EnumMessageType.REMOVE_TRACK, function(state, msg) {
        const { track } = msg.payload || {};

        state.sequencer.mixer.remove(track);

        return state;
    }],
    [ EnumMessageType.REORDER_FRAME, function(state, msg) {
        const { track, left, right } = msg.payload || {};

        if(track) {
            track.reorder(left, right);
        }

        return state;
    }],
    [ EnumMessageType.RETRACK_FRAME, function(state, msg) {
        const { frame, from, to, index } = msg.payload || {};

        if(from && to) {
            from.sendToTrack(frame, to, index);
        }

        return state;
    }],
    [ EnumMessageType.RESIZE_FRAME, function(state, msg) {
        const { frame, duration } = msg.payload || {};

        frame.duration = duration;

        return state;
    }],
    [ EnumMessageType.REMOVE_FRAME, function(state, msg) {
        const { track, frame } = msg.payload || {};

        track.remove(frame);

        return state;
    }],
];