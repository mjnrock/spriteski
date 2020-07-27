import Frame from "./../util/sequencer/Frame";

export const EnumMessageType = {
    UPLOAD_IMAGE: "UPLOAD_IMAGE",

    UPDATE_TILES: "UPDATE_TILES",
    TILE_SIZE: "TILE_SIZE",
    TILE_TAG: "TILE_TAG",

    COLLECTION_TAG: "COLLECTION_TAG",

    ADD_TRACK: "ADD_TRACK",
    REORDER_TRACK: "REORDER_TRACK",

    ADD_FRAME: "ADD_FRAME",
    REORDER_FRAME: "REORDER_FRAME",
    RETRACK_FRAME: "RETRACK_FRAME",
};

export const reducers = [
    [ EnumMessageType.UPLOAD_IMAGE, function(state, msg) {
        const data = msg.payload || {};
        
        this.state.tessellator.setImage(data);

        return state;
    }],
    // [ EnumMessageType.COLLECTION_TAG, function(state, msg) {
    //     const tags = msg.payload || {};

    //     state.collection.setTags(...tags);

    //     return state;
    // }],
    // [ EnumMessageType.UPDATE_TILES, function(state, msg) {
    //     const tiles = msg.payload || {};

    //     state.collection.tiles = tiles;

    //     return state;
    // }],
    [ EnumMessageType.TILE_SIZE, function(state, msg) {
        const { width, height } = msg.payload || {};

        state.tessellator.resize(width, height);

        return state;
    }],
    // [ EnumMessageType.TILE_TAG, function(state, msg) {
    //     const { x, y, tags } = msg.payload || {};

    //     state.collection.setTileTags(x, y, ...tags);

    //     return state;
    // }],
    // [ EnumMessageType.ADD_TRACK, function(state, msg) {
    //     state.mixer.newTrack();

    //     return state;
    // }],
    // [ EnumMessageType.REORDER_TRACK, function(state, msg) {
    //     const { left, right } = msg.payload || {};

    //     state.mixer.reorder(left, right);

    //     return state;
    // }],
    // [ EnumMessageType.ADD_FRAME, function(state, msg) {
    //     const { track } = msg.payload || {};
        
    //     const frame = new Frame({ source: "data:image/png;base64,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"});
    //     track.frames.set(frame.id, frame);
        
    //     return state;
    // }],
    // [ EnumMessageType.REORDER_FRAME, function(state, msg) {
    //     const { track, left, right } = msg.payload || {};

    //     if(track) {
    //         track.reorder(left, right);
    //     }

    //     return state;
    // }],
    // [ EnumMessageType.RETRACK_FRAME, function(state, msg) {
    //     const { frame, from, to, index } = msg.payload || {};

    //     if(from && to) {
    //         from.sendToTrack(frame, to, index);
    //     }

    //     return state;
    // }],
];