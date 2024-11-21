import Drawer from "./Drawer.js";
export class Display {
    constructor(width, height) {
        this.drawer = new Drawer(width, height);
    }
    draw(game) {
        let hole = game.getHole();
        let player = game.getPlayer();
        let carre = game.getRock();
        this.drawer.clear();
        const holes = game.getHole();
        for (let hole of holes) {
            hole.draw(this.drawer);
        }
        for (let i = 0; i < carre.length; i++) {
            this.drawer.drawRectangle(carre[i].getX(), carre[i].getY(), "red");
        }
        this.drawer.drawCircle(player.getX(), player.getY(), "green");
    }
}
