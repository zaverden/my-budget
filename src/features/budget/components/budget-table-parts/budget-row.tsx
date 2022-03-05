import cn from "classnames";
import { format, isToday, isWeekend } from "date-fns";
import { DateDelta } from "@p-features/budget/budget-calculator";
import { formatMoney } from "@p-features/budget/utils";
import CSS from "../budget-table.module.css";
import { RulesListButton } from "./rules-list-button";

export type BudgetRowProps = {
  delta: DateDelta;
};

export function BudgetRow({ delta }: BudgetRowProps) {
  const deltasSum = delta.rules.reduce((acc, { delta: amount }) => acc + amount, 0);
  const deltaClasses = cn(CSS.money, {
    [CSS.spend]: deltasSum < 0,
    [CSS.get]: deltasSum > 0,
    [CSS.zero]: deltasSum === 0,
  });
  const rowClasses = cn({
    [CSS.weekend]: isWeekend(delta.date),
    [CSS.today]: isToday(delta.date),
  });
  return (
    <tr className={rowClasses}>
      <td>{format(delta.date, "iii")}</td>
      <td>{format(delta.date, "MMM dd")}</td>
      <td className={cn(CSS.money)}>{formatMoney(delta.budgetAtEnd)}</td>
      <td className={deltaClasses}>{formatMoney(deltasSum, true)}</td>
      <td>{delta.rules[0]?.name}</td>
      <td>{delta.rules.length > 0 ? <RulesListButton rules={delta.rules} /> : null}</td>
    </tr>
  );
}
