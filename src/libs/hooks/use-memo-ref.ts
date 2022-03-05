import { DependencyList, useEffect, useRef } from "react";

export function useMemoRef<T>(factory: () => T, deps: DependencyList) {
  const ref = useRef<T>(factory());
  useEffect(() => {
    ref.current = factory();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps -- these are factory deps
  return ref;
}
