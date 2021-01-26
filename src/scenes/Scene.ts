import * as PIXI from 'pixi.js';
import { actualScene } from '../app.js';
import Entity from '../entity/Entity';
import WallEntity, { WallOptions } from '../entity/WallEntity';

export default abstract class Scene extends PIXI.Container {
	public background: PIXI.Sprite;

	protected constructor() {
		super();
		this.setup();
	}

	abstract setup();

	update() {
		this.height = window.innerHeight;
		this.width = window.innerWidth;
		this.children.forEach(child => {
			if (child instanceof Entity) child.emit('update');
			if (!(child instanceof WallEntity)) return;
			child.resizeToScene(actualScene);
		});

		this.sortChildren();

		this.background.width = this.width;
		this.background.height = this.height;
	}

	destroy() {
		super.destroy();

		this.background.destroy();
	}

	public addWall(x: number, y: number, width: number, height: number);
	public addWall(options: WallOptions);
	public addWall(options: WallOptions | number, y?: number, width?: number, height?: number) {
		if (typeof options === 'number')
			this.addChild(
				new WallEntity({
					x: options,
					y,
					width,
					height,
				}).resizeToScene(this)
			);
		else this.addChild(new WallEntity(options).resizeToScene(this));
	}
}
