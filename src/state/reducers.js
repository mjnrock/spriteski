export const EnumMessageType = {
    UPLOAD_IMAGE: "UPLOAD_IMAGE"
};

export const reducers = [
    [ EnumMessageType.UPLOAD_IMAGE, function(state, msg) {
        const data = msg.payload || {};
        
        this.state.tessellator.setImage(data);

        return state;
    }]
];