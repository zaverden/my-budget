import { R } from "@p/runtypes";
import { Y } from "@p/yup";
import { BaseRuleSchema, BaseRuleYup, isDateInRule } from "./_base-rule";

const weekDaysMap = Object.freeze({
  mo: 1,
  tu: 2,
  we: 3,
  th: 4,
  fr: 5,
  sa: 6,
  su: 0,
});

export const WeeklySchema = R.Record({
  ...BaseRuleSchema.fields,
  type: R.Literal("week"),
  weekDay: R.ObjectKeys(weekDaysMap),
});
export type Weekly = R.Static<typeof WeeklySchema>;

export const WeeklyYup = Y.object({
  ...BaseRuleYup.fields,
  type: Y.string().required().oneOf([WeeklySchema.fields.type.value]),
  weekDay: Y.string().required().oneOf(WeeklySchema.fields.weekDay.getOptions()),
});

export function isWeeklyMatch(d: Date, rule: Weekly): boolean {
  if (!isDateInRule(d, rule)) {
    return false;
  }
  const weekDay = d.getDay();
  const matchedWeekDay = weekDaysMap[rule.weekDay];
  return matchedWeekDay === weekDay;
}
