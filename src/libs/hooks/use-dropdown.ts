import { useState, useCallback, RefObject } from "react";
import { useClickOutside } from "./use-click-outside";

export type UseDropdownReturn = {
  isOpen: boolean;
  open(): void;
  close(): void;
  toggle(): void;
};

export function useDropdown(
  rootRef: RefObject<HTMLElement>
): UseDropdownReturn {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  useClickOutside(rootRef, close);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}
