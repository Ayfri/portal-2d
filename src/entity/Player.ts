import * as PIXI from 'pixi.js';
import { actualScene } from '../app.js';
import { D, Q } from '../client/InputManager.js';
import * as mathUtils from '../utils/mathUtils';
import Entity from './Entity';
import WallEntity from './WallEntity';

export default class Player extends Entity {
	public constructor() {
		super('player', {
			hasGravity: true,
		});

		Q.on('down', () => this.move(new PIXI.Point(-1, this.velocity.y / 2), 2));
		D.on('down', () => this.move(new PIXI.Point(1, this.velocity.y / 2), 2));
	}

	public setup() {}

	public update() {
		const walls: WallEntity[] = actualScene.children.filter((entity: Entity): entity is WallEntity => entity instanceof WallEntity);

		if (walls.every(wall => !mathUtils.isRectangleCollapse(this, wall))) this.canFall = true;

		walls.forEach(wall => {
			if (mathUtils.isRectangleCollapse(this, wall)) {
				const velocity: PIXI.Point = mathUtils.collisionResponse(this, wall);
				this.position.x += velocity.x;
				this.position.y += velocity.y;
				if (velocity.y > 0) this.canFall = false;
				console.log(velocity);
				if (velocity.x > 0) {
					this.velocity.x = 0;
					this.position.x -= 1;
				}
			}
		});
		super.update();
	}

	public move(direction: PIXI.Point, speed: number): void {
		this.velocity = direction.set(direction.x * speed, direction.y * speed);
	}
}
