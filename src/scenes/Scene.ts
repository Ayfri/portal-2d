import * as PIXI from 'pixi.js';

export default abstract class Scene extends PIXI.Container {
	public background: PIXI.Sprite;
	
	abstract setup();
	
	abstract update();
	
	destroy() {
		super.destroy();
		
		this.background.destroy();
	}
}
