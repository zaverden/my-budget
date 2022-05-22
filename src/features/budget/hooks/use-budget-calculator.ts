import { useCallback } from "react";
import { startOfToday } from "date-fns";
import { useAllRules } from "@p-features/rules/hooks/use-all-rules";
import { BudgetCalculator } from "../budget-calculator";

export function useBudgetCalculator(monthlyExpenses: number) {
  return useAllRules(
    useCallback(
      (rulesE) =>
        rulesE
          .mapRight((rules) =>
            BudgetCalculator.create(
              rules.map(({ data }) => data),
              monthlyExpenses,
              startOfToday()
            )
          )
          .join(),
      [monthlyExpenses]
    )
  );
}
