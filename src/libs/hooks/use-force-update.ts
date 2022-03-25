import { useCallback, useState } from "react";

export function useForceUpdate() {
  const [, setToken] = useState({});
  return useCallback(() => setToken({}), []);
}
