import * as PIXI from 'pixi.js';
import { actualScene } from '../app.js';
import * as mathUtils from '../utils/mathUtils';
import Entity from './Entity';
import WallEntity from './WallEntity';

export default class Player extends Entity {
	public constructor() {
		super('player', {
			hasGravity: true,
		});
	}

	public setup() {}

	public update() {
		const walls: WallEntity[] = actualScene.children.filter((entity: Entity): entity is WallEntity => entity instanceof WallEntity);

		walls.forEach(wall => {
			if (mathUtils.isRectangleCollapse(this, wall)) {
				console.log(mathUtils.manageRectangleCollisions(this, wall));

				let velocity: PIXI.Point = mathUtils.collisionResponse(this, wall);
				this.velocity.set(velocity.x, -velocity.y);
				if (velocity.y > 0) this.canFall = false;
			}
		});
		super.update();
	}
}
