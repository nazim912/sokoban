import { Point } from "./Point.js";
export class Hole extends Point {
    constructor(x, y, color) {
        super(x, y);
        this.occuped = false;
        this.color = "black";
    }
    setOccupied(occupied) {
        this.occuped = occupied;
    }
    isOccupied() {
        return this.occuped;
    }
    setColor(color) {
        this.color = color;
    }
    draw(drawer) {
        drawer.drawRectangle(this.x, this.y, this.color);
    }
}
