export function minMaxBy<T>(items: T[], compareFn: (a: T, b: T) => number): [min: T, max: T] {
  const sorted = [...items].sort(compareFn);
  const min = sorted.at(0)!;
  const max = sorted.at(-1)!;
  return [min, max];
}

export function minBy<T>(items: T[], compareFn: (a: T, b: T) => number): T {
  const [min] = minMaxBy(items, compareFn);
  return min;
}

export function maxBy<T>(items: T[], compareFn: (a: T, b: T) => number): T {
  const [, max] = minMaxBy(items, compareFn);
  return max;
}

export function minNBy<T>(items: T[], n: number, compareFn: (a: T, b: T) => number): T[] {
  const sorted = [...items].sort(compareFn);
  return sorted.slice(0, n);
}

export function localMins<T>(items: T[], compareFn: (a: T, b: T) => number): T[] {
  const mins: T[] = [];

  for (let index = 2; index < items.length; index += 1) {
    const left = items[index - 2];
    const mid = items[index - 1];
    const right = items[index];

    // TODO
    if (compareFn(left, mid) > 0 && compareFn(right, mid) > 0) {
      mins.push(mid);
    }
  }

  return mins;
}
