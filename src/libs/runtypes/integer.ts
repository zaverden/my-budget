import * as R from "runtypes";

export const Integer = R.Number.withBrand("Integer").withConstraint((v) =>
  Number.isInteger(v) ? true : `Expected integer, got ${v}`
);
