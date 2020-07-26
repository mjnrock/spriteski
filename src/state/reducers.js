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
    [ EnumMessageType.COLLECTION_TAG, function(state, msg) {
        const tags = msg.payload || {};

        state.collection.setTags(...tags);

        return state;
    }],
    [ EnumMessageType.UPDATE_TILES, function(state, msg) {
        const tiles = msg.payload || {};

        const collection = state.collection;
        
        collection.tiles = tiles;

        return {
            ...state,
            
            collection
        };
    }],
    [ EnumMessageType.TILE_SIZE, function(state, msg) {
        const { width, height } = msg.payload || {};

        this.state.tessellator.resize(width, height);

        return state;
    }],
    [ EnumMessageType.TILE_TAG, function(state, msg) {
        const { x, y, tags } = msg.payload || {};

        state.collection.setTileTags(x, y, ...tags);

        return state;
    }],
    [ EnumMessageType.ADD_TRACK, function(state, msg) {
        state.mixer.newTrack();

        return state;
    }],
    [ EnumMessageType.REORDER_TRACK, function(state, msg) {
        const { left, right } = msg.payload || {};

        state.mixer.reorder(left, right);

        return state;
    }],
    [ EnumMessageType.ADD_FRAME, function(state, msg) {
        const { track } = msg.payload || {};
        
        const frame = new Frame();
        track.frames.set(frame.id, frame);
        
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
];