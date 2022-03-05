import { isMatch } from "date-fns";
import * as R from "runtypes";

const ISO_DATE_FORMAT = `yyyy-MM-dd`;
export const IsoDate = R.String.withBrand("IsoDate").withConstraint(
  (str) =>
    isMatch(str, ISO_DATE_FORMAT) || `Should be formatted as "${ISO_DATE_FORMAT}" (got "${str}")`
);
