import * as PIXI from 'pixi.js';

interface EntityOptions {
	hasGravity?: boolean;
	mass?: number;
}

export default abstract class Entity extends PIXI.Sprite implements EntityOptions {
	public hasGravity: boolean;
	public canFall: boolean;
	public velocity: PIXI.Point;
	public mass: number;

	protected constructor(texture: string, options?: EntityOptions);
	protected constructor(texture: PIXI.Texture, options?: EntityOptions);
	protected constructor(texture: PIXI.Texture | string, options?: EntityOptions) {
		let textureName;
		if (typeof texture === 'string') {
			textureName = texture;
			texture = PIXI.Loader.shared.resources[texture].texture;
		}
		if (!texture) throw new Error(`Texture '${textureName}' not found.`);

		super(texture);
		this.setup();
		this.velocity = new PIXI.Point(0, 0);
		this.hasGravity = options?.hasGravity ?? false;
		this.mass = options?.mass ?? 1;
		this.canFall = true;
	}

	abstract setup();

	update() {
		if (this.hasGravity && this.canFall) this.velocity.y += 0.1;

		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}

	destroy(options?: { children?: boolean; texture?: boolean; baseTexture?: boolean }) {
		super.destroy(options);
	}
}
