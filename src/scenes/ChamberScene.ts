import * as PIXI from 'pixi.js';
import Player from '../entity/Player';
import { map } from '../utils/utils.js';
import Scene from './Scene';

export default abstract class ChamberScene extends Scene {
	public readonly spawnPoint: PIXI.Point;
	public player: Player;

	protected constructor(spawnPoint: PIXI.Point) {
		super();
		this.spawnPoint = spawnPoint;
	}

	public spawnPlayer(position?: PIXI.IPointData) {
		if (!position) position = this.spawnPoint;
		if (!this.player) this.player = new Player();
		this.player.position.set(map(position.x, 0, 1920, 0, window.innerWidth), map(position.y, 0, 1080, 0, window.innerHeight));
		this.addChild(this.player);
	}
}
