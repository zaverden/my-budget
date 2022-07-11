import { DateDelta } from "../budget-calculator";
import { BudgetRow } from "./budget-table-parts/budget-row";
import { BudgetRowShort } from "./budget-table-parts/budget-short-row";
import CSS from "./budget-table.module.css";

export type BudgetTableProps = {
  deltas: DateDelta[];
  short?: boolean;
};

export function BudgetTable({ deltas, short = false }: BudgetTableProps) {
  return (
    <table className={CSS["budget-table"]}>
      <tbody>
        {deltas.map((delta) =>
          short ? (
            <BudgetRowShort key={delta.date.toISOString()} delta={delta} />
          ) : (
            <BudgetRow key={delta.date.toISOString()} delta={delta} />
          )
        )}
      </tbody>
    </table>
  );
}
