import Player from '../entity/Player.js';
import Scene from './Scene.js';

export default class ChamberScene extends Scene {
	public player: Player;
	
	public constructor() {
		super();
		this.player = new Player();
	}
	
	public load() {
		this.addChild(this.player);
	}
	
	public update() {
	}
}
