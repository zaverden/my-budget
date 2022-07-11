import { Chart, AxisOptions } from "react-charts";
import { Box } from "@mui/material";
import { DateDelta } from "../budget-calculator";

export type BudgetChartProps = {
  deltas: DateDelta[];
};

type DeltaAxisOptions = AxisOptions<DateDelta>;
const primaryAxis: DeltaAxisOptions = {
  scaleType: "localTime",
  getValue: ({ date }) => date,
};
const secondaryAxis: DeltaAxisOptions = {
  getValue: ({ budgetAtEnd }) => Math.floor(budgetAtEnd / 1000_00),
};

export function BudgetChart({ deltas }: BudgetChartProps) {
  return (
    <Box height={200}>
      <Chart
        options={{
          data: [{ label: "budget", data: deltas }],
          primaryAxis,
          secondaryAxes: [secondaryAxis],
        }}
      />
    </Box>
  );
}
