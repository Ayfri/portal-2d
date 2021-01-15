import * as PIXI from 'pixi.js';

export default abstract class Entity extends PIXI.Sprite {
	protected constructor(texture: string);
	protected constructor(texture: PIXI.Texture);
	protected constructor(texture: PIXI.Texture | string) {
		if (typeof texture === 'string') texture = PIXI.Loader.shared.resources[texture].texture;
		super(texture);
		this.load();
	}
	
	abstract load();
	
	abstract update();
	
	destroy(options?: {
		children?: boolean;
		texture?: boolean;
		baseTexture?: boolean;
	}) {
		super.destroy(options);
	}
}
