export const EnumMessageType = {
    UPLOAD_IMAGE: "UPLOAD_IMAGE"
};

export const reducers = [
    [ EnumMessageType.UPLOAD_IMAGE, (state, msg, node) => {
        const data = msg.payload || {};
        
        state.tessellator.setImage(data);

        return state;
    }]
];