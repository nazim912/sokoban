import { Direction } from "./Direction.js";
export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    touch(other_point) {
        if (other_point == this)
            return false;
        return this.x == other_point.getX() && this.y == other_point.getY();
    }
    nextPosition(direction) {
        let x = this.x;
        let y = this.y;
        switch (direction) {
            case Direction.UP:
                y -= 1;
                break;
            case Direction.DOWN:
                y += 1;
                break;
            case Direction.LEFT:
                x -= 1;
                break;
            case Direction.RIGHT:
                x += 1;
                break;
        }
        return new Point(x, y);
    }
}
