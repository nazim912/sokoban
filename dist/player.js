import { Point } from "./Point.js";
export class Player extends Point {
    constructor(x, y) {
        super(x, y);
    }
    collide(width, height) {
        return this.getX() < 0 || this.getX() >= width || this.getY() < 0 || this.getY() >= height;
    }
}
