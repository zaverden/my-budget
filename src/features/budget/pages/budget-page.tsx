import { useMemo, useState } from "react";
import { addMonths, startOfDay, subWeeks } from "date-fns";
import { BudgetView } from "@p-features/budget/components/budget-view";
import { useBudgetCalculator } from "@p-features/budget/hooks/use-budget-calculator";
import { formatMoney } from "@p-features/budget/utils";
import { useAuth } from "@p-features/login/hooks/use-auth";

function MessagedError(props: { error: Error }) {
  return <pre>{props.error.message}</pre>;
}

export function BudgetPage() {
  const auth = useAuth("redirect-if-anon");
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const today = useMemo(() => subWeeks(startOfDay(new Date()), 1), []);
  const future = useMemo(() => addMonths(today, 24), [today]);
  const calcQ = useBudgetCalculator(monthlyExpenses);

  const changeMonthlyExpenses = () => {
    // eslint-disable-next-line no-alert -- meh
    const meStr = prompt("monthlyExpenses", monthlyExpenses.toString()) || "0";
    const me = parseInt(meStr, 10);
    setMonthlyExpenses(Number.isNaN(me) ? 0 : me);
  };

  if (!auth.initialized || calcQ.isLoading || calcQ.isIdle) {
    return <h1>Loading...</h1>;
  }

  if (calcQ.isError) {
    return (
      <div>
        <h1>Error</h1>
        <pre>{JSON.stringify(calcQ.error, null, 2)}</pre>
      </div>
    );
  }

  const contentE = calcQ.data
    .mapRight((calculator) => (
      <div>
        <h1>Budget</h1>
        <p>
          <button type="button" onClick={changeMonthlyExpenses}>
            {formatMoney(monthlyExpenses)}
          </button>
        </p>
        <BudgetView calculator={calculator} start={today} end={future} />
      </div>
    ))
    .mapLeft((fail) => {
      if (fail instanceof Error) {
        return <MessagedError error={fail} />;
      }
      return (
        <div>
          <h1>Errors</h1>
          {fail.map((error) => (
            <div key={error.ruleId}>
              <pre>{JSON.stringify(error, null, 2)}</pre>
            </div>
          ))}
        </div>
      );
    });

  return contentE.value;
}
