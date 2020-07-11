export const EnumMessageType = {
    UPLOAD_IMAGE: "UPLOAD_IMAGE",
    TILE_SIZE: "TILE_SIZE",
    TILE_TAG: "TILE_TAG",
    DELETE_TILE: "DELETE_TILE",
    COLLECTION_TAG: "COLLECTION_TAG",
};

export const reducers = [
    [ EnumMessageType.UPLOAD_IMAGE, function(state, msg) {
        const data = msg.payload || {};
        
        this.state.tessellator.setImage(data);
        
        state.collection.tiles = this.state.tessellator.tessellate()

        return state;
    }],
    [ EnumMessageType.TILE_SIZE, function(state, msg) {
        const data = msg.payload || {};

        this.state.tessellator.resize(data.width, data.height);
        
        state.collection.tiles = this.state.tessellator.tessellate()

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