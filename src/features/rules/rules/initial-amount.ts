import { R } from "@p/runtypes";
import { Y } from "@p/yup";
import { BaseRuleSchema, BaseRuleYup, isStartDate } from "./_base-rule";

export const InitialAmountSchema = R.Record({
  ...BaseRuleSchema.fields,
  type: R.Literal("initial"),
});

export type InitialAmount = R.Static<typeof InitialAmountSchema>;

export const InitialAmountYup = Y.object({
  ...BaseRuleYup.fields,
  type: Y.string().required().oneOf([InitialAmountSchema.fields.type.value]),
});

export function isInitialAmountMatch(d: Date, rule: InitialAmount): boolean {
  return isStartDate(d, rule);
}
