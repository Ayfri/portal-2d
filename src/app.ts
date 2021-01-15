import * as PIXI from 'pixi.js';

export const app = new PIXI.Application({
	resizeTo: window
});

document.body.appendChild(app.view);
