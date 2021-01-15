import * as PIXI from 'pixi.js';

export const app = new PIXI.Application({
	antialias: true,
	resizeTo: window,
});

PIXI.Loader.shared.add('test', 'assets/test.png');
PIXI.Loader.shared.load();
PIXI.Loader.shared.onComplete.add(() => {
	const sprite = PIXI.Sprite.from(PIXI.Loader.shared.resources['test'].texture);
	sprite.position.set(window.innerWidth / 2, window.innerHeight / 2);
	app.stage.addChild(sprite);
});

document.body.appendChild(app.view);
