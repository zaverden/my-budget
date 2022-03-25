export type Dictionary<T = unknown> = Record<string, T>;

export type Entity<T extends Dictionary> = {
  id: string;
  data: T;
};

export type UnknownFn = (...args: unknown[]) => unknown;
export type UnknownAsyncFn = (...args: unknown[]) => Promise<unknown>;

export type None<T> = null | undefined | T;
export type Undef<T> = undefined | T;

export type StringKeys<T extends Record<string, unknown>> = Extract<keyof T, string>;

export type EmptyObj = Record<string, never>;