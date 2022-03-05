import { getDaysInMonth } from "date-fns";
import { R } from "@p/runtypes";
import { Y } from "@p/yup";
import { BaseRuleSchema, BaseRuleYup, isDateInRule } from "./_base-rule";

const MONTH_DAY_MIN = -5;
const MONTH_DAY_MAX = 31;

export const MonthlySchema = R.Record({
  ...BaseRuleSchema.fields,
  type: R.Literal("month"),
  monthDay: R.Integer.withConstraint((v) => {
    if (v < MONTH_DAY_MIN) {
      return `must be greater than or equal to ${MONTH_DAY_MIN}`;
    }
    if (v > MONTH_DAY_MAX) {
      return `must be less than or equal to ${MONTH_DAY_MAX}`;
    }
    return true;
  }),
});
export type Monthly = R.Static<typeof MonthlySchema>;

export const MonthlyYup = Y.object({
  ...BaseRuleYup.fields,
  type: Y.string().required().oneOf([MonthlySchema.fields.type.value]),
  monthDay: Y.number().required().integer().min(MONTH_DAY_MIN).max(MONTH_DAY_MAX),
});

export function isMonthlyMatch(d: Date, rule: Monthly): boolean {
  if (!isDateInRule(d, rule)) {
    return false;
  }

  const dayOfMonth = d.getDate();
  if (dayOfMonth === rule.monthDay) {
    return true;
  }

  const daysInMonth = getDaysInMonth(d);
  const targetDay = rule.monthDay < 0 ? daysInMonth + rule.monthDay + 1 : rule.monthDay;
  return dayOfMonth === targetDay || (targetDay > daysInMonth && dayOfMonth === daysInMonth);
}
