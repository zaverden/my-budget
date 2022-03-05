import { isMatch } from "date-fns";
import * as Y from "yup";

declare module "yup" {
  interface StringSchema {
    isoDate(): this;
  }
}

const ISO_DATE_FORMAT = `yyyy-MM-dd`;
Y.addMethod(Y.string, "isoDate", function isoDate() {
  return this.test({
    name: "iso-date",
    message: `Should be formatted as "${ISO_DATE_FORMAT}"`,
    test: (str: string | undefined) => !str || isMatch(str, ISO_DATE_FORMAT),
  });
});

export { Y };
