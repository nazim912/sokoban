import { Display } from "./Display.js";
import { Hole } from "./Hole.js";
import { Player } from "./player.js";
import { Point } from "./Point.js";
import { Carre } from "./Carre.js";
import { Direction } from "./Direction.js";
function get_rand(max) {
    return Math.floor(Math.random() * 48 + 1);
}
export class Game {
    constructor(width, height) {
        this.carres = [];
        this.holes = [];
        this.selectedLevel = 0;
        this.solvedHoles = 0;
        this.player = new Player(10, 15);
        this.width = width;
        this.height = height;
        this.display = new Display(width, height);
        this.dir = [Direction.RIGHT];
    }
    create_player() {
        let new_pos = this.get_empty_pos();
        return new Player(new_pos.getX(), new_pos.getY());
    }
    create_carre() {
        let new_pos = this.get_empty_pos();
        return new Carre(new_pos.getX(), new_pos.getY());
    }
    create_Hole() {
        let new_pos = this.get_empty_pos();
        return new Hole(new_pos.getX(), new_pos.getY(), "black");
    }
    get_empty_pos() {
        while (true) {
            let pos = new Point(get_rand(this.width), get_rand(this.height));
            if (!this.player.touch(pos))
                return pos;
        }
    }
    isOccupied(position) {
        for (let i = 0; i < this.holes.length; i++) {
            if (this.holes[i].touch(position)) {
                return this.holes[i].isOccupied();
            }
        }
        return false;
    }
    movePlayer(direction) {
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
                                this.run();
                            }
                            break;
                        }
                    }
                }
                return;
            }
        }
        for (let i = 0; i < this.holes.length; i++) {
            if (this.holes[i].touch(nextPosition)) {
                if (this.holes[i].isOccupied()) {
                    this.player.setPosition(nextPosition.getX(), nextPosition.getY());
                }
                return;
            }
        }
        if (!this.isOccupied(nextPosition)) {
            this.player.setPosition(nextPosition.getX(), nextPosition.getY());
        }
    }
    isLimit(position) {
        return position.getX() < 0 || position.getX() >= this.width || position.getY() < 0 || position.getY() >= this.height;
    }
    removeCarre(carre) {
        const index = this.carres.indexOf(carre);
        if (index > -1) {
            this.carres.splice(index, 1);
        }
    }
    isHole(position) {
        for (let i = 0; i < this.holes.length; i++) {
            if (this.holes[i].touch(position)) {
                return true;
            }
        }
        return false;
    }
    run() {
        this.carres = [];
        this.holes = [];
        this.player = this.create_player();
        for (let i = 0; i < 3; i++) {
            this.carres.push(this.create_carre());
            this.holes.push(this.create_Hole());
        }
        this.display.draw(this);
    }
    initialize() {
        document.addEventListener("keydown", (event) => {
            let new_dir;
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
    getRock() {
        return this.carres;
    }
    getHole() {
        return this.holes;
    }
    getPlayer() {
        return this.player;
    }
    play(display) {
        this.display.draw(this);
        if (this.player.collide(this.width, this.height))
            return true;
        return false;
    }
}
