import { useCallback, useRef } from "react";
import { Dialog, DialogProps } from "@mui/material";
import { Either, left, right } from "@sweet-monads/either";
import { createDefer, Defer } from "@p/utils";
import { useForceUpdate } from "./use-force-update";

export type DialogControls<T> = {
  isOpen: boolean;
  open(): Promise<Either<null, T>>;
  submit(value: T): void;
  cancel(): void;
};

export function useDialogControls<T>(): DialogControls<T> {
  const deferRef = useRef<Defer<Either<null, T>>>();
  const update = useForceUpdate();

  const open = useCallback(() => {
    if (deferRef.current === undefined) {
      deferRef.current = createDefer<Either<null, T>>();
      update();
    }
    return deferRef.current;
  }, [update]);

  const submit = useCallback(
    (value: T) => {
      deferRef.current?.resolve(right(value));
      deferRef.current = undefined;
      update();
    },
    [update]
  );

  const cancel = useCallback(() => {
    deferRef.current?.resolve(left(null));
    deferRef.current = undefined;
    update();
  }, [update]);

  return {
    isOpen: deferRef.current !== undefined,
    open,
    submit,
    cancel,
  };
}

export type DialogWrapperProps = Omit<DialogProps, "open">;
export type UseDialogResult<T> = [
  Dialog: (props: DialogWrapperProps) => JSX.Element,
  controls: DialogControls<T>
];

type DialogOnClose = Exclude<DialogProps["onClose"], undefined>;
export function useDialog<T>(): UseDialogResult<T> {
  const controls = useDialogControls<T>();
  function DialogWrapper({ children, ...props }: DialogWrapperProps) {
    const { onClose: onCloseProps } = props;
    const onClose = useCallback<DialogOnClose>(
      (event, reason) => {
        onCloseProps?.(event, reason);
        controls.cancel();
      },
      [onCloseProps]
    );
    return (
      <Dialog {...props} open={controls.isOpen} onClose={onClose}>
        {children}
      </Dialog>
    );
  }
  return [DialogWrapper, controls];
}
