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
		this.player.position.set(window.innerWidth / 2, window.innerHeight / 2);

		this.addWall({
			x: window.innerWidth / 2,
			y: window.innerHeight / 2 + 100,
			width: 50,
			height: 50,
		});
	}
}
