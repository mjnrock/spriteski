import { v4 as uuidv4 } from "uuid";
import Score from "./Score";

export default class Composition {
    constructor({ scores = [] } = {}) {
        this.id = uuidv4();
        
        this.scores = scores;
    }
};