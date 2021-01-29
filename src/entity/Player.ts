import * as PIXI from 'pixi.js';
import { D, Q, space } from '../client/InputManager.js';
import Entity from './Entity';

export default class Player extends Entity {
	public constructor() {
		super('player', {
			hasGravity: true,
		});
	}

	public setup() {}

	public update() {
		this.manageWallCollisions();
		super.update();
		if (this.isOnGround) {
			if (Q.isPressed && this.velocity.x > -4) this.move(new PIXI.Point(-1, 0), 2);
			if (D.isPressed && this.velocity.x < 4) this.move(new PIXI.Point(1, 0), 2);
		} else {
			if (Q.isPressed && this.velocity.x > -4) this.move(new PIXI.Point(-1, 0), 0.7);
			if (D.isPressed && this.velocity.x < 4) this.move(new PIXI.Point(1, 0), 0.7);
			this.velocity.x *= 0.90;
		
		}
		if (space.isPressed && this.isOnGround) {
			this.move(new PIXI.Point(0, -1), 0.8);
			this.position.y += this.velocity.y;
		}
		
	}
}
