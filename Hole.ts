import { Point } from "./Point.js";

export class Hole extends Point{
    public occuped: boolean =false
    public color: string 

    constructor(x:number,y:number,color:string){
        super(x,y);
        this.color="black"
    }

    public setOccupied(occupied: boolean): void {
        this.occuped = occupied;
    }

    public isOccupied(): boolean {
        return this.occuped;
    }

    public setColor(color: string): void {
        this.color = color;
    }
    public draw(drawer: any): void {
        drawer.drawRectangle(this.x, this.y, this.color);
    }
    
}