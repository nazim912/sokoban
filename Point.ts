import { Direction } from "./Direction.js";

export class Point{
    protected x: number;
    protected y: number;

    constructor(x:number,y:number){
        this.x = x;
        this.y = y;
    }

    public getX():number{
        return this.x;
    }

    public getY():number{
        return this.y;
    }

    public setPosition(x: number, y: number) {
        this.x = x
        this.y = y
    }

    public touch(other_point:Point):boolean{
        if(other_point == this){
             return false
        }
        return this.x==other_point.getX() && this.y == other_point.getY();
    }
    public nextPosition(direction: Direction): Point {
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