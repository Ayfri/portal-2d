import ChamberScene from './ChamberScene.js';
import * as PIXI from 'pixi.js';

export default class TestChamber extends ChamberScene {
	public constructor() {
		super();
	}
	
	
	public setup() {
		this.spawnPlayer({
			x: 1600,
			y: 500
		});
		
		this.background = PIXI.Sprite.from(PIXI.Loader.shared.resources['testChamberBackground'].texture);
		this.background.zIndex = -1000;
		this.addChild(this.background);
	}
}
