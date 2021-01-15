import { app } from '../app.js';
import Player from '../entity/Player.js';
import Scene from './Scene.js';

export default class ChamberScene extends Scene {
	public player: Player;
	
	public constructor() {
		super();
	}
	
	public setup() {
		this.player = new Player();
		this.addChild(this.player);
		this.player.position.set(window.innerWidth / 2, window.innerHeight / 2);
	}
	
	public update() {
	}
}
