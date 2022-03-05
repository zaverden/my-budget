import { R } from "@p/runtypes";
import { StringKeys } from "@p/ts";
import { InitialAmountSchema, isInitialAmountMatch } from "./initial-amount";
import { MonthlySchema, isMonthlyMatch } from "./monthly";
import { OneTimeSchema, isOneTimeMatch } from "./one-time";
import { WeeklySchema, isWeeklyMatch } from "./weekly";

export const RulesMap = Object.freeze({
  [InitialAmountSchema.fields.type.value]: InitialAmountSchema,
  [OneTimeSchema.fields.type.value]: OneTimeSchema,
  [WeeklySchema.fields.type.value]: WeeklySchema,
  [MonthlySchema.fields.type.value]: MonthlySchema,
});
export type RulesMap = {
  [K in keyof typeof RulesMap]: R.Static<typeof RulesMap[K]>;
};

const allRules = [InitialAmountSchema, OneTimeSchema, WeeklySchema, MonthlySchema] as const;
export const RuleSchema = R.Union(...allRules);
export type Rule = R.Static<typeof RuleSchema>;

export function isRuleMatch(d: Date, rule: Rule): boolean {
  const isMatch = RuleSchema.match(
    (initialAmount) => isInitialAmountMatch(d, initialAmount),
    (oneTime) => isOneTimeMatch(d, oneTime),
    (weekly) => isWeeklyMatch(d, weekly),
    (monthly) => isMonthlyMatch(d, monthly)
  );
  return isMatch(rule);
}

export type RuleType = StringKeys<typeof RulesMap>;
export const RuleTypes = Object.keys(RulesMap) as RuleType[];

export * from "./initial-amount";
export * from "./one-time";
export * from "./monthly";
export * from "./weekly";
