import { DateDelta } from "../budget-calculator";
import { BudgetRow } from "./budget-table-parts/budget-row";
import CSS from "./budget-table.module.css";

export type BudgetTableProps = {
  deltas: DateDelta[];
};

export function BudgetTable({ deltas }: BudgetTableProps) {
  return (
    <table className={CSS["budget-table"]}>
      <tbody>
        {deltas.map((delta) => (
          <BudgetRow key={delta.date.toISOString()} delta={delta} />
        ))}
      </tbody>
    </table>
  );
}
