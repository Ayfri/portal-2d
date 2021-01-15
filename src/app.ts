import * as PIXI from 'pixi.js';
import ChamberScene from './scenes/ChamberScene.js';

export const app = new PIXI.Application({
	antialias: true,
	resizeTo: window,
});

function loadTextures() {
	PIXI.Loader.shared.add('test', 'assets/test.png');
	PIXI.Loader.shared.add('player', 'assets/player.png');
	PIXI.Loader.shared.load();
}

function tests() {
	PIXI.Loader.shared.onComplete.add(() => {
		const sprite = PIXI.Sprite.from(PIXI.Loader.shared.resources['test'].texture);
		sprite.position.set(window.innerWidth / 2, window.innerHeight / 2);
		app.stage.addChild(sprite);
	});
	
	new ChamberScene();
}

loadTextures();
tests();

document.body.appendChild(app.view);
