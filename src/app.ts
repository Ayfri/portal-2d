import * as PIXI from 'pixi.js';
import ChamberScene from './scenes/ChamberScene.js';

export const app = new PIXI.Application({
	antialias: true,
	resizeTo:  window,
	backgroundColor: 0xdddddd
});

async function loadTextures() {
	await new Promise((resolve) => {
		PIXI.Loader.shared.add('test', 'assets/test.png');
		PIXI.Loader.shared.add('player', 'assets/player.png');
		PIXI.Loader.shared.load(resolve);
	});
}

function tests() {
	PIXI.Loader.shared.onComplete.add(() => {
		const sprite = PIXI.Sprite.from(PIXI.Loader.shared.resources['test'].texture);
		sprite.position.set(window.innerWidth / 2, window.innerHeight / 2);
		app.stage.addChild(sprite);
	});
	
	const testChamber: ChamberScene = new ChamberScene();
	app.stage.addChild(testChamber);
}

loadTextures().then(() => {
	tests();
});


document.body.appendChild(app.view);
