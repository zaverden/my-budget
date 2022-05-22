import { Entity } from "@p/ts";
import { compareStrings, joinCompare } from "@p/utils";
import { Rule } from "../rules";

export type RulesListProps = {
  rules: Entity<Rule>[];
};
export function RulesList({ rules }: RulesListProps) {
  return (
    <div>
      {rules
        .sort((a, b) =>
          joinCompare([
            compareStrings(a.data.endDate ?? "z", b.data.endDate ?? "z"),
            compareStrings(a.data.startDate, b.data.startDate),
          ])
        )
        .map((rule) => (
          <p>
            <pre>
              {JSON.stringify(
                {
                  id: rule.id,
                  ...rule.data,
                },
                null,
                2
              )}
            </pre>
          </p>
        ))}
    </div>
  );
}
