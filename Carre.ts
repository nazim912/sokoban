import { Hole } from "./Hole.js";
import { Point } from "./Point.js";

export class Carre extends Point{
    constructor(x:number,y:number){
        super(x,y);
    }

    public touchHole(hole:Hole):boolean{
        return this.touch(hole);
    }

}