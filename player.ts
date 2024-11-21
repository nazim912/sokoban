import { Point } from "./Point.js";

export class Player extends Point{
    constructor(x:number,y:number){
        super(x,y);
    }
    public collide(width: number, height: number): boolean {
        return this.getX() < 0 || this.getX() >= width || this.getY() < 0 || this.getY() >= height;
    }
}