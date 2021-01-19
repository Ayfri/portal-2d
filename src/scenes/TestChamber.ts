import ChamberScene from './ChamberScene.js';
import * as PIXI from 'pixi.js';

export default class TestChamber extends ChamberScene {
	public constructor() {
		super();
	}
	
	
	public setup() {
		this.background = PIXI.Sprite.from(PIXI.Loader.shared.resources['testChamberBackground'].texture);
		this.background.width = window.innerWidth;
		this.background.height = window.innerHeight;
		this.addChild(this.background);
		
		this.spawnPlayer({
			x: 1600,
			y: 500
		});
	}
}
