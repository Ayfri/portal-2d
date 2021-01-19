import * as PIXI from 'pixi.js';

export const keys = new Set<Key>();

class Key extends PIXI.utils.EventEmitter {
	private _pressedAt: number = 0;

	constructor(public readonly id: string | number) {
		super();
		keys.add(this);
	}

	private _isPressed: boolean = false;

	get isPressed(): boolean {
		return this._isPressed;
	}

	get duration(): number {
		if (!this._isPressed) return 0;
		return Date.now() - this._pressedAt;
	}

	handle(event: KeyboardEvent, action: 'up' | 'down') {
		this.emit(action, event, this.duration);
		if (action === 'down') {
			this._isPressed = true;
			this._pressedAt = Date.now();
		} else {
			this._isPressed = false;
		}
	}

	on(event: 'up' | 'down', fn: (event?: KeyboardEvent, duration?: number) => unknown, context?: any): this {
		super.on(event, fn, context);
		return this;
	}

	once(event: 'up' | 'down', fn: (eventN: KeyboardEvent, durationN: number) => unknown, context?: any): this {
		super.once(event, fn, context);
		return this;
	}

	isMineEvent(event: KeyboardEvent): boolean {
		if (typeof this.id === 'string') return event.key === this.id;
		return event.keyCode === this.id;
	}
}

export const Q = new Key('q');
export const D = new Key('d');
export const up = new Key('ArrowUp');
export const left = new Key('ArrowLeft');
export const right = new Key('ArrowRight');
export const down = new Key('ArrowDown');
export const space = new Key(' ');

document.addEventListener('keydown', event => {
	keys.forEach(key => {
		if (key.isMineEvent(event)) key.handle(event, 'down');
	});
});

document.addEventListener('keyup', event => {
	keys.forEach(key => {
		if (key.isMineEvent(event)) key.handle(event, 'up');
	});
});
