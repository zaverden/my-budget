import { RulesMap, RuleType } from "@p-features/rules/rules";
import { ExhaustiveError } from "@p/utils";
import { InitialAmountForm } from "./initial-amount-rule-form";
import { MonthlyRuleForm } from "./monthly-rule-form";
import { OneTimeRuleForm } from "./one-time-rule-form";
import { WeeklyRuleForm } from "./weekly-rule-form";

type Hack<T> = T extends RuleType
  ? {
      type: T;
      onSubmit?: (rule: RulesMap[T]) => void;
    }
  : never;

export type CreateRuleFormProps = Hack<RuleType>;

export function CreateRuleForm(props: CreateRuleFormProps) {
  if (props.type === "week") {
    return <WeeklyRuleForm onSubmit={props.onSubmit} />;
  }
  if (props.type === "month") {
    return <MonthlyRuleForm onSubmit={props.onSubmit} />;
  }
  if (props.type === "one-time") {
    return <OneTimeRuleForm onSubmit={props.onSubmit} />;
  }
  if (props.type === "initial") {
    return <InitialAmountForm onSubmit={props.onSubmit} />;
  }

  throw new ExhaustiveError("RuleForm got unexpected type of rule", props);
}
