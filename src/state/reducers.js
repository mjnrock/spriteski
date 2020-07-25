export const EnumMessageType = {
    UPLOAD_IMAGE: "UPLOAD_IMAGE",

    UPDATE_TILES: "UPDATE_TILES",
    TILE_SIZE: "TILE_SIZE",
    TILE_TAG: "TILE_TAG",

    COLLECTION_TAG: "COLLECTION_TAG",
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
];