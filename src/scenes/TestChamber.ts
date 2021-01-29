import { isRectangleCollapse, Rectangle } from '../utils/collisionsUtils.js';
import ChamberScene from './ChamberScene.js';
import * as PIXI from 'pixi.js';

export default class TestChamber extends ChamberScene {
	public debugText: PIXI.Text;
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
		this.debugText = new PIXI.Text('');
		this.addChild(this.debugText);
	}

	public update() {
		super.update();
		if (!isRectangleCollapse(new Rectangle(0, 0, window.innerWidth, window.innerHeight), this.player)) {
			this.spawnPlayer();
		}

		this.debugText.text = JSON.stringify(
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
		);
	}
}
