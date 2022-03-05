import { Rule } from "@p-features/rules/rules";
import { ExhaustiveError } from "@p/utils";
import { InitialAmountForm } from "./initial-amount-rule-form";
import { MonthlyRuleForm } from "./monthly-rule-form";
import { OneTimeRuleForm } from "./one-time-rule-form";
import { WeeklyRuleForm } from "./weekly-rule-form";

type Hack<T> = T extends Rule
  ? {
      rule: T;
      onSubmit?: (rule: T) => void;
    }
  : never;

export type CreateRuleFormProps = Hack<Rule>;

export function CreateRuleForm(props: CreateRuleFormProps) {
  if (props.rule.type === "week") {
    type T = typeof props.rule;
    return <WeeklyRuleForm onSubmit={props.onSubmit as (rule: T) => void} />;
  }
  if (props.rule.type === "month") {
    type T = typeof props.rule;
    return <MonthlyRuleForm onSubmit={props.onSubmit as (rule: T) => void} />;
  }
  if (props.rule.type === "one-time") {
    type T = typeof props.rule;
    return <OneTimeRuleForm onSubmit={props.onSubmit as (rule: T) => void} />;
  }
  if (props.rule.type === "initial") {
    type T = typeof props.rule;
    return <InitialAmountForm onSubmit={props.onSubmit as (rule: T) => void} />;
  }

  throw new ExhaustiveError("RuleForm got unexpected type of rule", props.rule);
}
