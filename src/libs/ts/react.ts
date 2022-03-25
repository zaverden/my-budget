import { ReactNode } from "react";
import { Dictionary, EmptyObj } from "./types";

export type PropsWithRequiredChildren<T extends Dictionary = EmptyObj> = T & {
  children: ReactNode;
};
