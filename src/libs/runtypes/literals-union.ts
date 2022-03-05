import * as R from "runtypes";
import { LiteralBase } from "runtypes/lib/types/literal";

type Tuple<T> = [T, ...T[]];
type Literals<T extends Tuple<LiteralBase>> = {
  [K in keyof T]: T[K] extends LiteralBase ? R.Literal<T[K]> : never;
};

interface LiteralsUnion<T extends Tuple<LiteralBase>> extends R.Union<[...Literals<T>]> {
  getOptions(): T;
}

export function LiteralsUnion<T extends Tuple<LiteralBase>>(...values: T): LiteralsUnion<T> {
  const literals = values.map((v) => R.Literal(v)) as Literals<T>;
  return Object.assign(R.Union(...literals), {
    getOptions: () => values,
  });
}
