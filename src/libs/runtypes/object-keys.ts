import { StringKeys } from "@p/ts";
import { LiteralsUnion } from "./literals-union";

export function ObjectKeys<T extends Record<string, unknown>>(obj: T) {
  const objKeys = Object.keys(obj) as [StringKeys<T>];
  return LiteralsUnion(...objKeys);
}
