export function withUnit(number: number, unit: string): string {
  return `${number} ${unit}${number === 1 ? '' : 's'}`;
}
