import { Point } from "./Point.js";
export class Carre extends Point {
    constructor(x, y) {
        super(x, y);
    }
    touchHole(hole) {
        return this.touch(hole);
    }
}
