import { Game } from "./Game.js";
import { Display } from "./Display.js";
import Drawer from "./Drawer.js";

let width : number = 50;
let height : number = 50;
let game = new Game(width,height);
game.initialize();
game.run()