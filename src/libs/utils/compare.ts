export function compareStrings(a: string, b: string): -1 | 0 | 1 {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

export function joinCompare(compareResults: number[]): number {
  return compareResults.find((r) => r !== 0) ?? 0;
}
