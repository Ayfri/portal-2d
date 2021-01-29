import { isRectangleCollapse, Rectangle } from '../utils/collisionsUtils.js';
import ChamberScene from './ChamberScene.js';
import * as PIXI from 'pixi.js';

export default class TestChamber extends ChamberScene {
	public constructor() {
		super(new PIXI.Point(1600, 500));
	}

	public setup() {
		this.background = PIXI.Sprite.from(PIXI.Loader.shared.resources['testChamberBackground'].texture);
		this.background.width = window.innerWidth;
		this.background.height = window.innerHeight;
		this.addChild(this.background);

		this.spawnPlayer({
			x: 1600,
			y: 500,
		});

		this.addWall(0, 1080 - 184, 1920, 184);
		this.addWall(0, 0, 194, 1080);
		this.addWall(1920 - 125, 0, 125, 1080);
		this.addWall(0, 0, 1920, 44);
		this.addWall(719, 531, 143, 366);
		this.addWall(1029, 345, 297, 77);
		this.addWall(862, 681, 184, 73);
		this.addWall(1379, 601, 416, 119);
		this.addWall(273, 711, 279, 63);
		this.addWall(587, 579, 132, 43);
		this.addWall(194, 307, 298, 69);
		this.addWall(1029, 44, 171, 301);
	}

	public update() {
		super.update();
		if (!isRectangleCollapse(new Rectangle(0, 0, window.innerWidth, window.innerHeight), this.player)) {
			this.spawnPlayer();
		}

		/*this.debugText.text = JSON.stringify(
			{
				position: {
					x: this.player.position.x,
					y: this.player.position.y,
				},
				velocity: this.player.velocity,
				states: {
					hasGravity: this.player.hasGravity,
					onGround: this.player.isOnGround,
				},
				touchingWalls: [...this.player.touchingWall.entries()].map(w => `${w[0]}`),
			},
			null,
			4
		);*/
	}
}
