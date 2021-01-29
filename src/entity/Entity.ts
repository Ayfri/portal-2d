import * as PIXI from 'pixi.js';
import { actualScene } from '../app.js';
import { isRectangleCollapse, manageRectangleCollisions, TouchingWallSide } from '../utils/collisionsUtils.js';
import type WallEntity from './WallEntity.js';

interface EntityOptions {
	hasGravity?: boolean;
	mass?: number;
}

export default abstract class Entity extends PIXI.Sprite implements EntityOptions {
	public hasGravity: boolean;
	public mass: number;
	public velocity: PIXI.Point;
	public touchingWall: Map<TouchingWallSide, WallEntity>;

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
		this.touchingWall = new Map();

		this.on('update', () => this.update());
	}
	
	public get isOnGround(): boolean {
		return this.touchingWall.has('top');
	}
	
	public abstract setup();
	
	public update() {
		if (this.isOnGround) {
			this.emit('onGround');
			this.position.y += this.touchingWall.get('top').getBounds().top - this.getBounds().bottom + 0.1;
			this.velocity.y = 0;
		}
		else if (this.hasGravity) this.velocity.y += 0.1;

		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}
	
	public move(direction: PIXI.Point, speed: number): void {
		this.velocity.x += direction.x * speed;
		this.velocity.y += direction.y * speed;
	}
	
	public manageWallCollisions() {
		const walls: WallEntity[] = actualScene.children.filter((entity: Entity): entity is WallEntity => entity.constructor.name === 'WallEntity');
		walls.forEach(wall => {
			if (isRectangleCollapse(this, wall)) {
				const touchingWallSide: TouchingWallSide = manageRectangleCollisions(wall, this);
				this.touchingWall.set(touchingWallSide, wall);
				this.emit('touchWall', touchingWallSide, wall);
			}
		});
		
		this.touchingWall.forEach((wall, side) => {
			switch (side) {
				case 'bottom':
					this.move(new PIXI.Point(this.velocity.x / 10, 1), 2);
					break;
				
				case 'top':
					this.move(new PIXI.Point(-this.velocity.x / 5, -1), 2);
					break;
				
				case 'left':
					this.move(new PIXI.Point(-this.velocity.x || -2, 0), 1);
					break;
					
				case 'right':
					this.move(new PIXI.Point(-this.velocity.x || 2, 0), 1);
					break;
			}
			
			if (!isRectangleCollapse(wall, this)) this.touchingWall.delete(side);
		});
	}

	destroy(options?: { children?: boolean; texture?: boolean; baseTexture?: boolean }) {
		super.destroy(options);
	}
}
