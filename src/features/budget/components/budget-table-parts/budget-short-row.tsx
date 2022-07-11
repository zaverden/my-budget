import clsx from "clsx";
import { format, isToday, isWeekend } from "date-fns";
import { DateDelta } from "@p-features/budget/budget-calculator";
import { formatMoney } from "@p-features/budget/utils";
import CSS from "../budget-table.module.css";

export type BudgetRowShortProps = {
  delta: DateDelta;
};

export function BudgetRowShort({ delta }: BudgetRowShortProps) {
  const rowClasses = clsx({
    [CSS.weekend]: isWeekend(delta.date),
    [CSS.today]: isToday(delta.date),
  });
  return (
    <tr className={rowClasses}>
      <td>{format(delta.date, "iii")}</td>
      <td className={clsx(CSS.date)}>{format(delta.date, "MMM dd")}</td>
      <td className={clsx(CSS.money)}>{formatMoney(delta.budgetAtEnd)}</td>
    </tr>
  );
}
