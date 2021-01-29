import * as PIXI from 'pixi.js';
import Player from './entity/Player.js';
import WallEntity from './entity/WallEntity.js';
import Scene from './scenes/Scene.js';
import TestChamber from './scenes/TestChamber.js';
import { isRectangleCollapse } from './utils/collisionsUtils.js';

export let actualScene: Scene;

export const app = new PIXI.Application({
	antialias: true,
	resizeTo: window,
	backgroundColor: 0xdddddd,
});

loadTextures().then(() => {
	tests();
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
			window['player'] = actualScene.children.find(c => c instanceof Player);
			window['walls'] = actualScene.children.filter(c => c instanceof WallEntity);
			window['isRectangleCollapse'] = isRectangleCollapse;
		},
		undefined,
		PIXI.UPDATE_PRIORITY.HIGH
	);

	setScene(new TestChamber());
	window['actualScene'] = actualScene;
}

function setScene(scene: Scene) {
	actualScene = scene;
	app.stage.addChild(actualScene);
}

document.body.appendChild(app.view);
window['app'] = app;
window['PIXI'] = PIXI;
