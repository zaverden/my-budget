import { useRef } from "react";
import { Rule } from "@p-features/rules/rules";
import { useDropdown } from "@p/hooks";
import CSS from "../budget-table.module.css";
import { RulesList } from "./rules-list";

export type RulesListButtonProps = {
  rules: Rule[];
};

export function RulesListButton({ rules }: RulesListButtonProps) {
  const rootRef = useRef(null);
  const dropdown = useDropdown(rootRef);
  return (
    <button ref={rootRef} type="button" className={CSS.more} onClick={dropdown.open}>
      <span>❔</span>
      {dropdown.isOpen ? (
        <div className={CSS.list}>
          <RulesList rules={rules} />
        </div>
      ) : null}
    </button>
  );
}
