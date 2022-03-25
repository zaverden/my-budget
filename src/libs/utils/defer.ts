export type Defer<T> = Promise<T> & {
  resolve(value: T | PromiseLike<T>): void;
  reject(reason?: unknown): void;
};

export function createDefer<T>(): Defer<T> {
  let resolve = null as Defer<T>["resolve"] | null;
  let reject = null as Defer<T>["reject"] | null;

  const promise = new Promise<T>((innerResolve, innerReject) => {
    resolve = innerResolve;
    reject = innerReject;
  });
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- promise constructor is called synchronously, so resolve and reject are already initialized here
  return Object.assign(promise, { resolve: resolve!, reject: reject! });
}
