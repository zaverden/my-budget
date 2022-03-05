import { useCallback } from "react";
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
              monthlyExpenses
            )
          )
          .join(),
      [monthlyExpenses]
    )
  );
}
