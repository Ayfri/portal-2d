export function map(value: number, minValue: number, maxValue: number, minTarget: number, maxTarget: number): number {
	return ((value - minValue) / maxValue) * maxTarget + minTarget;
}
