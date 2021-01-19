import Player from '../entity/Player';
import Scene from './Scene';

export default abstract class ChamberScene extends Scene {
	public player: Player;
	
	public spawnPlayer(position: PIXI.IPointData) {
		this.player = new Player();
		this.addChild(this.player);
		this.player.position.set(position.x, position.y);
	}
}
