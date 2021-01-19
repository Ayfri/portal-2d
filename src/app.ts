import * as PIXI from 'pixi.js';
import Scene from './scenes/Scene.js';
import TestChamber from './scenes/TestChamber.js';

export let actualScene: Scene;

export const app = new PIXI.Application({
	antialias: true,
	resizeTo: window,
	backgroundColor: 0xdddddd,
});

async function loadTextures() {
	await new Promise(resolve => {
		PIXI.Loader.shared.add('test', 'assets/test.png');
		PIXI.Loader.shared.add('player', 'assets/player.png');
		PIXI.Loader.shared.add('testChamberBackground', 'assets/test level.png');
		PIXI.Loader.shared.load(resolve);
	});
}

function tests() {
	PIXI.Loader.shared.onComplete.add(() => {
		const sprite = PIXI.Sprite.from(PIXI.Loader.shared.resources['test'].texture);
		sprite.position.set(window.innerWidth / 2, window.innerHeight / 2);
		app.stage.addChild(sprite);
	});

	PIXI.Ticker.shared.add(
		() => {
			actualScene?.update();
		},
		undefined,
		PIXI.UPDATE_PRIORITY.HIGH
	);

	setScene(new TestChamber());
}

function setScene(scene: Scene) {
	actualScene = scene;
	app.stage.addChild(actualScene);
}

loadTextures().then(() => {
	tests();
});

document.body.appendChild(app.view);
