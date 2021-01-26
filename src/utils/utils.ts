export function map(value: number, minValue: number, maxValue: number, minTarget: number, maxTarget: number): number {
	if (value === 0) return 0;
	return ((value - minValue) * (maxTarget - minTarget)) / (maxValue - minValue) + minTarget;
}
