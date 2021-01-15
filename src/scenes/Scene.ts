import * as PIXI from 'pixi.js';
import Entity from '../entity/Entity.js';

export default abstract class Scene extends PIXI.Container {
	public background: PIXI.Sprite;
	
	protected constructor() {
		super();
		this.setup();
	}
	
	abstract setup();
	
	update() {
		this.children.forEach(child => {
			if (child instanceof Entity) child.update();
		});
	}
	
	destroy() {
		super.destroy();
		
		this.background.destroy();
	}
}
