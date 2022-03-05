import { EffectCallback, useEffect } from "react";

export function useOnMount(fn: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps -- fn should run once
  useEffect(fn, []);
}
