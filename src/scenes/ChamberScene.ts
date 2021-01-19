import Player from '../entity/Player';
import Scene from './Scene';

export default class ChamberScene extends Scene {
	public player: Player;

	public constructor() {
		super();
	}

	public setup() {
		this.player = new Player();
		this.addChild(this.player);
		this.player.position.set(window.innerWidth / 2, window.innerHeight / 2 - 500);

		this.addWall({
			x: window.innerWidth / 2 - 300,
			y: window.innerHeight / 2 - 100,
			width: 300,
			height: 400,
		});
	}
}
