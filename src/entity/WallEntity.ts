import * as PIXI from 'pixi.js';
import Scene from '../scenes/Scene.js';
import { map } from '../utils/utils.js';
import Entity from './Entity';

export interface WallOptions {
	x: number;
	y: number;
	width: number;
	height: number;
}

export default class WallEntity extends Entity {
	public readonly initial: PIXI.Rectangle;

	public constructor(x: number, y: number, width: number, height: number);
	public constructor(options: WallOptions);
	public constructor(options: WallOptions | number, y?: number, width?: number, height?: number) {
		super(PIXI.Texture.WHITE, {
			mass: 1000,
		});

		if (typeof options === 'number') {
			this.position.set(options, y);
			this.width = width;
			this.height = height;
		} else {
			this.position.set(options.x, options.y);
			this.width = options.width;
			this.height = options.height;
		}

		this.initial = new PIXI.Rectangle(this.position.x, this.position.y, this.width, this.height);
	}

	public resizeToScene(scene: Scene) {
		this.position.x = map(this.initial.x, 0, 1920, 0, scene.width);
		this.position.y = map(this.initial.y, 0, 1080, 0, scene.height);
		this.width = map(this.initial.width, 0, 1920, 0, scene.width);
		this.height = map(this.initial.height, 0, 1080, 0, scene.height);

		return this;
	}

	public setup() {}
}
