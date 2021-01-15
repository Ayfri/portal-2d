import * as PIXI from 'pixi.js';

export default abstract class Scene extends PIXI.Container {
	public background: PIXI.Sprite;
	
	abstract load();
	
	abstract update();
	
	destroy() {
		super.destroy();
		
		this.background.destroy();
	}
}
