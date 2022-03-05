import { addYears, isSameDay, isWithinInterval, parseISO } from "date-fns";
import { R } from "@p/runtypes";
import { Y } from "@p/yup";

const DATE_NEVER = addYears(Date.now(), 100);

export const BaseRuleSchema = R.Record({
  name: R.String,
  delta: R.Number,
  startDate: R.IsoDate,
  endDate: R.Optional(R.IsoDate),
});

export const BaseRuleYup = Y.object({
  name: Y.string().required(),
  delta: Y.number().required(),
  startDate: Y.string().required().isoDate(),
  endDate: Y.string().isoDate(),
});

export type BaseRule = R.Static<typeof BaseRuleSchema>;

export function isDateInRule(d: Date, rule: BaseRule) {
  const start = parseISO(rule.startDate);
  const end = rule.endDate ? parseISO(rule.endDate) : DATE_NEVER;
  return isWithinInterval(d, { start, end });
}

export function isStartDate(d: Date, rule: BaseRule) {
  const start = parseISO(rule.startDate);
  return isSameDay(d, start);
}
