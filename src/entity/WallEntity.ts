import * as PIXI from 'pixi.js';
import Entity from './Entity';

export interface WallOptions {
	x: number;
	y: number;
	width: number;
	height: number;
}

export default class WallEntity extends Entity {
	public constructor(options: WallOptions) {
		super(PIXI.Texture.WHITE, {
			mass: 1000,
		});
		this.position.set(options.x, options.y);
		this.width = options.width;
		this.height = options.height;
	}

	public setup() {}
}
