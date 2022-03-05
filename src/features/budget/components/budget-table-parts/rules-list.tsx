import cn from "classnames";
import { formatMoney } from "@p-features/budget/utils";
import { Rule } from "@p-features/rules/rules";
import CSS from "../budget-table.module.css";

function RuleRow({ rule }: { rule: Rule }) {
  const deltaClass = cn(CSS.money, {
    [CSS.spend]: rule.delta < 0,
    [CSS.get]: rule.delta > 0,
    [CSS.zero]: rule.delta === 0,
  });
  return (
    <tr>
      <td>{rule.name}</td>
      <td className={deltaClass}>{formatMoney(rule.delta, true)}</td>
    </tr>
  );
}

export type RulesListProps = {
  rules: Rule[];
};

export function RulesList({ rules }: RulesListProps) {
  return (
    <table>
      <tbody>
        {rules.map((rule) => (
          <RuleRow key={rule.name} rule={rule} />
        ))}
      </tbody>
    </table>
  );
}
