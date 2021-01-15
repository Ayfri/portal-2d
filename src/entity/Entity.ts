import * as PIXI from 'pixi.js';

export default abstract class Entity extends PIXI.Sprite {
	
	protected constructor(texture: string);
	protected constructor(texture: PIXI.Texture);
	protected constructor(texture: PIXI.Texture | string) {
		let textureName;
		if (typeof texture === 'string') {
			textureName = texture;
			texture = PIXI.Loader.shared.resources[texture].texture;
		}
		if(!texture) throw new Error(`Texture '${textureName}' not found.`);
		
		super(texture);
		this.setup();
	}
	
	abstract setup();
	
	abstract update();
	
	destroy(options?: {
		children?: boolean;
		texture?: boolean;
		baseTexture?: boolean;
	}) {
		super.destroy(options);
	}
}
