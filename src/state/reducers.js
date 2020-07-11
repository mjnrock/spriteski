export const EnumMessageType = {
    UPLOAD_IMAGE: "UPLOAD_IMAGE",
    TILE_SIZE: "TILE_SIZE",
};

export const reducers = [
    [ EnumMessageType.UPLOAD_IMAGE, function(state, msg) {
        const data = msg.payload || {};
        
        this.state.tessellator.setImage(data);

        return state;
    }],
    [ EnumMessageType.TILE_SIZE, function(state, msg) {
        const data = msg.payload || {};

        this.state.tessellator.resize(data.width, data.height);

        return state;
    }]
];