import ChamberScene from './ChamberScene.js';
import Scene from './Scene.js';

export default class TestChamber extends ChamberScene {
	public setup() {
		this.spawnPlayer({
			x: 1600,
			y: 500
		});
	}

}
