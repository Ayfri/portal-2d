import * as PIXI from 'pixi.js';

export class Rectangle extends PIXI.Rectangle {
	public halfWidth: number;
	public halfHeight: number;
	public xAnchorOffset: number;
	public yAnchorOffset: number;
	public anchor: PIXI.ObservablePoint;

	constructor(x: number, y: number, width: number, height: number, anchor?: PIXI.ObservablePoint) {
		super(x, y, width, height);
		this.anchor = anchor ?? new PIXI.Point();
		this.halfWidth = width / 2;
		this.halfHeight = height / 2;
		this.xAnchorOffset = this.width * this.anchor.x;
		this.yAnchorOffset = this.height * this.anchor.y;
	}

	static fromSprite(sprite: PIXI.DisplayObject) {
		return new Rectangle(sprite.x, sprite.y, sprite.getBounds().width, sprite.getBounds().height);
	}
}

export function isRectangleCollapse(rectangle1: PIXI.DisplayObject, rectangle2: PIXI.DisplayObject) {
	const rect1 = Rectangle.fromSprite(rectangle1);
	const rect2 = Rectangle.fromSprite(rectangle2);

	return rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y;
}

export function distanceBetweenTwoPoints(p1: PIXI.IPointData, p2: PIXI.IPointData): number {
	const a = p1.x - p2.x;
	const b = p1.y - p2.y;

	return Math.hypot(a, b);
}

export function manageRectangleCollisions(rectangle1: PIXI.DisplayObject, rectangle2: PIXI.DisplayObject) {
	const rect1 = Rectangle.fromSprite(rectangle1);
	const rect2 = Rectangle.fromSprite(rectangle2);
	const vx = rect1.x + Math.abs(rect1.halfWidth) - rect1.xAnchorOffset - (rect2.x + Math.abs(rect2.halfWidth) - rect2.xAnchorOffset);
	const vy = rect1.y + Math.abs(rect1.halfHeight) - rect1.yAnchorOffset - (rect2.y + Math.abs(rect2.halfHeight) - rect2.yAnchorOffset);
	const combinedHalfWidths = Math.abs(rect1.halfWidth) + Math.abs(rect2.halfWidth);
	const combinedHalfHeights = Math.abs(rect1.halfHeight) + Math.abs(rect2.halfHeight);
	let collision, overlapX, overlapY;

	if (Math.abs(vx) < combinedHalfWidths) {
		if (Math.abs(vy) < combinedHalfHeights) {
			overlapX = combinedHalfWidths - Math.abs(vx);
			overlapY = combinedHalfHeights - Math.abs(vy);

			if (overlapX >= overlapY) {
				if (vy > 0) {
					collision = 'top';
					rect1.y = rect1.y + overlapY;
				} else {
					collision = 'bottom';
					rect1.y = rect1.y - overlapY;
				}
			} else {
				if (vx > 0) {
					collision = 'left';
					rect1.x = rect1.x + overlapX;
				} else {
					collision = 'right';
					rect1.x = rect1.x - overlapX;
				}
			}
		}
	}

	return collision;
}
