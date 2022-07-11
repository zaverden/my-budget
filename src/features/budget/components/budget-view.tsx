import { Fragment, useMemo } from "react";
import { addMonths, eachDayOfInterval } from "date-fns";
import { localMins, minNBy } from "@p/utils";
import { BudgetCalculator } from "../budget-calculator";
import { BudgetChart } from "./budget-chart";
import { BudgetTable } from "./budget-table";

export type BudgetViewProps = {
  calculator: BudgetCalculator;
  start: Date;
};

export function BudgetView({ calculator, start }: BudgetViewProps) {
  const tableDeltas = useMemo(() => {
    const end = addMonths(start, 24);
    const days = eachDayOfInterval({ start, end });
    return days.map((d) => calculator.getDateDelta(d));
  }, [calculator, start]);

  const chartDeltas = useMemo(() => {
    const end = addMonths(start, 3);
    const days = eachDayOfInterval({ start, end });
    return days.map((d) => calculator.getDateDelta(d));
  }, [calculator, start]);

  const minValues = useMemo(
    () =>
      minNBy(
        localMins(tableDeltas, (a, b) => a.budgetAtEnd - b.budgetAtEnd),
        3,
        (a, b) => a.budgetAtEnd - b.budgetAtEnd
      ),
    [tableDeltas]
  );

  return (
    <Fragment>
      <BudgetChart deltas={chartDeltas} />
      <BudgetTable deltas={minValues} short />
      <hr />
      <BudgetTable deltas={tableDeltas} />
    </Fragment>
  );
}
