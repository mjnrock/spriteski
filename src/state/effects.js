export const effects = [
    function(state) {
        console.info(state, this);

        console.log(state.tessellator.tile(0, 0, 3, 1).toDataURL());
    }
];