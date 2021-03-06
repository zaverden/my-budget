import { BudgetPage } from "@p-features/budget/pages/budget-page";
import { MainLayout } from "@p-layouts/main-layout";
import { withPageConfig } from "@p/page";

export default withPageConfig(BudgetPage, {
  layoutComponent: MainLayout,
});
