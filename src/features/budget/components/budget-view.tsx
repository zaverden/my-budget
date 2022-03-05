import { useMemo } from "react";
import { eachDayOfInterval } from "date-fns";
import { BudgetCalculator } from "../budget-calculator";
import { BudgetTable } from "./budget-table";

export type BudgetViewProps = {
  calculator: BudgetCalculator;
  start: Date;
  end: Date;
};

export function BudgetView({ calculator, start, end }: BudgetViewProps) {
  const deltas = useMemo(() => {
    const days = eachDayOfInterval({ start, end });
    return days.map((d) => calculator.getDateDelta(d));
  }, [calculator, start, end]);

  return <BudgetTable deltas={deltas} />;
}
