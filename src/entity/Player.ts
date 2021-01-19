import * as PIXI from 'pixi.js';
import { actualScene } from '../app.js';
import { D, Q, space } from '../client/InputManager.js';
import * as mathUtils from '../utils/mathUtils';
import Entity from './Entity';
import WallEntity from './WallEntity';

export default class Player extends Entity {
	public constructor() {
		super('player', {
			hasGravity: true
		});
	}
	
	public setup() {}
	
	public update() {
		super.update();
		const walls: WallEntity[] = actualScene.children.filter((entity: Entity): entity is WallEntity => entity instanceof WallEntity);
		
		if (this.isOnGround) {
			if (Q.isPressed && this.velocity.x > -5) this.move(new PIXI.Point(-1, 0), 1.7);
			if (D.isPressed && this.velocity.x < 5) this.move(new PIXI.Point(1, 0), 1.7);
		} else {
			if (Q.isPressed && this.velocity.x > -5) this.move(new PIXI.Point(-1, 0), 0.55);
			if (D.isPressed && this.velocity.x < 5) this.move(new PIXI.Point(1, 0), 0.55);
			this.velocity.x *= 0.92;
		}
		if (space.isPressed && !this.canFall) {
			this.move(new PIXI.Point(0, -1), 2.5);
			this.position.y += this.velocity.y;
		}
		
		if (walls.every(wall => !mathUtils.isRectangleCollapse(this, wall))) {
			this.canFall = true;
			this.isOnGround = false;
		}
		
		walls.forEach(wall => {
			if (mathUtils.isRectangleCollapse(this, wall)) {
				switch (mathUtils.manageRectangleCollisions(wall, this)) {
					case 'bottom':
						this.move(new PIXI.Point(this.velocity.x / 10, 1), 2);
						break;
					
					case 'top':
						this.canFall = false;
						this.move(new PIXI.Point(-this.velocity.x / 5, 1), 2);
						this.isOnGround = true;
						break;
					
					case 'left':
					case 'right':
						this.move(new PIXI.Point(-this.velocity.x, 0), 1);
						break;
				}
			}
		});
	}
	
	public move(direction: PIXI.Point, speed: number): void {
		this.velocity.x += direction.x * speed;
		this.velocity.y += direction.y * speed;
	}
}
