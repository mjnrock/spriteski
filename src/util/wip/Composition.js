import Score from "./Score";

export default class Composition {
    constructor({ scores = [] } = {}) {
        this.scores = scores;
    }
};