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
                  name: rule.data.name,
                  delta: rule.data.delta,
                  startDate: rule.data.startDate,
                  endDate: rule.data.endDate,
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
