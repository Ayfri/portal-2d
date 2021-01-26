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
	}

	public update() {
		super.update();
		if (!isRectangleCollapse(new Rectangle(0, 0, window.innerWidth, window.innerHeight), this.player)) {
			this.spawnPlayer();
		}
	}
}
