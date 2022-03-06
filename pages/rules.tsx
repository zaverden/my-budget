import { ManageRulesPage } from "@p-features/rules/pages/manage-rules-page";
import { MainLayout } from "@p-layouts/main-layout";
import { withPageConfig } from "@p/page";

export default withPageConfig(ManageRulesPage, {
  layoutComponent: MainLayout,
});
