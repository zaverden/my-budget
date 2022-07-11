import { useMemo, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import { addMonths, startOfWeek, subWeeks } from "date-fns";
import { BudgetView } from "@p-features/budget/components/budget-view";
import { useBudgetCalculator } from "@p-features/budget/hooks/use-budget-calculator";
import { formatMoney } from "@p-features/budget/utils";
import { useAuth } from "@p-features/login/hooks/use-auth";
import { useDialog } from "@p/hooks";
import { MonthlyExpensesDialogContent } from "../components/monthly-expenses-dialog-content";

function MessagedError(props: { error: Error }) {
  return <pre>{props.error.message}</pre>;
}

export function BudgetPage() {
  const auth = useAuth("redirect-if-anon");
  const [monthlyExpenses, setMonthlyExpenses] = useState(100_000_00);
  const [MonthlyExpensesDialog, monthlyExpensesDialogControls] = useDialog<number>();
  const [startDate, setStartDate] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));
  const endDate = useMemo(() => addMonths(startDate, 24), [startDate]);

  const calcQ = useBudgetCalculator(monthlyExpenses);

  const changeMonthlyExpenses = async () => {
    const res = await monthlyExpensesDialogControls.open();
    if (res.isRight()) {
      setMonthlyExpenses(res.value);
    }
  };

  const moveToPast = () => setStartDate((d) => subWeeks(d, 1));

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
      <Stack px={2} gap={1}>
        <Typography variant="h2">Budget</Typography>
        <Stack direction="row" gap={2}>
          <Button variant="outlined" type="button" onClick={changeMonthlyExpenses}>
            Monthly expenses: {formatMoney(monthlyExpenses)}
          </Button>
          <IconButton color="primary" onClick={moveToPast}>
            <ArrowUpwardIcon /> past week <ArrowUpwardIcon />
          </IconButton>
          <MonthlyExpensesDialog>
            <MonthlyExpensesDialogContent
              initial={monthlyExpenses}
              onCancel={monthlyExpensesDialogControls.cancel}
              onSubmit={monthlyExpensesDialogControls.submit}
            />
          </MonthlyExpensesDialog>
        </Stack>
        <BudgetView calculator={calculator} start={startDate} end={endDate} />
      </Stack>
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
