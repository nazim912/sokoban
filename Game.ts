import { Display } from "./Display.js";
import { Hole } from "./Hole.js";
import { Player } from "./player.js";
import { Point } from "./Point.js";
import { Carre } from "./Carre.js";
import { Direction } from "./Direction.js";

function get_rand(max:number):number{
    return Math.floor(Math.random()*48+1);
}

export class Game {
    protected player: Player;
    protected carres: Carre[] = [];
    protected holes: Hole[] = [];
    protected width: number;
    protected height: number;
    protected dir: Direction[];
    protected display: Display;
    protected selectedLevel: number = 0;
    protected solvedHoles: number = 0;

    constructor(width: number, height: number) {
        this.player = new Player(10, 15);
        this.width = width;
        this.height = height;
        this.display = new Display(width, height);
        this.dir = [Direction.RIGHT];
    }

    public create_player():Player{
        let new_pos : Point = this.get_empty_pos();
        return new Player(new_pos.getX(),new_pos.getY());
    }

    public create_carre():Carre{
        let new_pos : Point = this.get_empty_pos();
        return new Carre(new_pos.getX(),new_pos.getY());
    }

    public create_Hole():Hole{
        let new_pos : Point = this.get_empty_pos();
        return new Hole(new_pos.getX(),new_pos.getY(),"black");
    }

    public get_empty_pos():Point{
        while(true){
            let pos : Point = new Point(get_rand(this.width),get_rand(this.height));
            if(!this.player.touch(pos)) return pos;
        }
    }
    public isOccupied(position: Point): boolean {
        for (let i = 0; i < this.holes.length; i++) { 
            if (this.holes[i].touch(position)) {
                return this.holes[i].isOccupied()
            }
        }
        return false
    }
    public movePlayer(direction: Direction) {
        const nextPosition = this.player.nextPosition(direction);
   
        if (this.isLimit(nextPosition)) {
            return;
        }
 
        for (let i = 0; i < this.carres.length; i++) {
            let carre = this.carres[i];
            for (let j = 0; j < this.holes.length; j++) {
                if (this.holes[j].touch(carre)) {
                    this.holes[j].setColor("grey");
                    this.holes[j].setOccupied(true);
                    this.removeCarre(carre);
                    break;
                }
            }
           
 
            if (carre.touch(nextPosition)) {
                const nextCarrePosition = carre.nextPosition(direction);
 
                if (!this.isOccupied(nextCarrePosition)) {
                    carre.setPosition(nextCarrePosition.getX(), nextCarrePosition.getY());
                    this.player.setPosition(nextPosition.getX(), nextPosition.getY());
                    for (let j = 0; j < this.holes.length; j++) {
                        if (this.holes[j].touch(carre)) {
                            this.solvedHoles++;
                            if (this.solvedHoles === this.holes.length) {
                                this.run()
                            }
                            break;
                        }
                    }
                }
                return
            }
        }
 
        for (let i = 0; i < this.holes.length; i++) {
            if (this.holes[i].touch(nextPosition)) {
                if (this.holes[i].isOccupied()) {
                    this.player.setPosition(nextPosition.getX(), nextPosition.getY())
                }
                return
            }
        }
   
        if (!this.isOccupied(nextPosition)) {
            this.player.setPosition(nextPosition.getX(), nextPosition.getY())
        }
    }

    private isLimit(position: Point): boolean {
        return position.getX() < 0 || position.getX() >= this.width || position.getY() < 0 || position.getY() >= this.height
    }


    public removeCarre(carre: Carre): void {
        const index = this.carres.indexOf(carre)
        if (index > -1) {
            this.carres.splice(index, 1)
        }
    }
    private isHole(position: Point): boolean {
        for (let i = 0; i < this.holes.length; i++) {
            if (this.holes[i].touch(position)) {
                return true;
            }
        }
        return false
    }


    public run() {
        this.carres = []
        this.holes =[]
        this.player = this.create_player();
        for (let i = 0; i < 3; i++) {
            this.carres.push(this.create_carre())
            this.holes.push(this.create_Hole())
        }
        this.display.draw(this)
    }


    public initialize(): void {
        document.addEventListener("keydown", (event) => {
            let new_dir: Direction | undefined;
            switch (event.key) {
                case "ArrowUp":
                    new_dir = Direction.UP;
                    break;
                case "ArrowDown":
                    new_dir = Direction.DOWN;
                    break;
                case "ArrowLeft":
                    new_dir = Direction.LEFT;
                    break;
                case "ArrowRight":
                    new_dir = Direction.RIGHT;
                    break;
            }
    
            if (new_dir !== undefined) {
                this.movePlayer(new_dir);
                this.display.draw(this);
            }
        });
    }


    public getRock(): Carre[] {
        return this.carres;
    }

    public getHole(): Hole[] {
        return this.holes;
    }

    public getPlayer(): Player {
        return this.player;
    }

    public play(): boolean {
        this.display.draw(this);

        if (this.player.collide(this.width, this.height)) return true;
    
        return false;
    }
}

