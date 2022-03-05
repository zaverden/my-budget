import { RefObject, useCallback, useEffect } from "react";

/** https://www.30secondsofcode.org/react/s/use-click-outside */
export function useClickOutside(ref: RefObject<HTMLElement>, callback: () => void): void {
  const handleClick = useCallback(
    (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    },
    [callback, ref]
  );
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick]);
}
