export const EnumMessageType = {
    UPLOAD_IMAGE: "UPLOAD_IMAGE",

    TILE_SIZE: "TILE_SIZE",
    TILE_TAG: "TILE_TAG",
    DELETE_TILE: "DELETE_TILE",
    UPDATE_TILES: "UPDATE_TILES",

    COLLECTION_TAG: "COLLECTION_TAG",

    ADD_FRAME: "ADD_FRAME",
    DELETE_FRAME: "DELETE_FRAME",
    UPDATE_FRAME: "UPDATE_FRAME",
};

export const reducers = [
    [ EnumMessageType.ADD_FRAME, function(state, msg) {
        const { row, index, tile, duration, opts } = msg.payload || {};

        state.sequencer.addFrame(row, index, tile, duration, opts);

        return state;
    }],
    [ EnumMessageType.DELETE_FRAME, function(state, msg) {
        const { row, index } = msg.payload || {};
        
        state.sequencer.removeFrame(row, index);

        return state;
    }],
    [ EnumMessageType.UPDATE_FRAME, function(state, msg) {
        const data = msg.payload || {};

        return state;
    }],
    [ EnumMessageType.UPLOAD_IMAGE, function(state, msg) {
        const data = msg.payload || {};
        
        this.state.tessellator.setImage(data);

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
    [ EnumMessageType.COLLECTION_TAG, function(state, msg) {
        const tags = msg.payload || {};

        state.collection.setTags(...tags);

        return state;
    }],
    [ EnumMessageType.TILE_TAG, function(state, msg) {
        const { x, y, tags } = msg.payload || {};

        state.collection.setTileTags(x, y, ...tags);

        return state;
    }],
    [ EnumMessageType.DELETE_TILE, function(state, msg) {
        const { x, y } = msg.payload || {};

        state.collection.delete(x, y);

        return state;
    }]
];