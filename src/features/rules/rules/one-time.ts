import { R } from "@p/runtypes";
import { Y } from "@p/yup";
import { BaseRuleSchema, BaseRuleYup, isStartDate } from "./_base-rule";

export const OneTimeSchema = R.Record({
  ...BaseRuleSchema.fields,
  type: R.Literal("one-time"),
});
export type OneTime = R.Static<typeof OneTimeSchema>;

export const OneTimeYup = Y.object({
  ...BaseRuleYup.fields,
  type: Y.string().required().oneOf([OneTimeSchema.fields.type.value]),
});

export function isOneTimeMatch(d: Date, rule: OneTime): boolean {
  return isStartDate(d, rule);
}
