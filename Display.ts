import Drawer from "./Drawer.js";
import { Game } from "./Game.js";

export class Display {
    private drawer: Drawer

    constructor(width: number, height: number) {
        this.drawer = new Drawer(width, height)
    }

    draw(game: Game) {
        let hole = game.getHole()
        let player = game.getPlayer()
        let carre = game.getRock()

        this.drawer.clear()

        const holes = game.getHole();
    for (let hole of holes) {
        hole.draw(this.drawer);
    }

        for (let i = 0; i < carre.length; i++) {
            this.drawer.drawRectangle(carre[i].getX(), carre[i].getY(), "red")
        }
        this.drawer.drawCircle(player.getX(), player.getY(), "green")

    }

}