import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import type { ChartConfig } from "../../components/ui/chart"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "../../components/ui/chart"
import { useYearlyFinanceData } from "../../customHooks/dashboardHooks/useYearlyFinanceData";

const chartConfig = {
  einnahmen: {
    label: "Einnahmen",
    color: "#4ade80",
  },
  ausgaben: {
    label: "Ausgaben",
    color: "#f87171",
  },
} satisfies ChartConfig;

type ChartYearlyProps = {
  selectedYear: number;
};

const ChartYearly = ({ selectedYear }: ChartYearlyProps) => {

  const chartData = useYearlyFinanceData(selectedYear);

  return (
    <div className="border rounded-xl p-6 shadow-sm">
      <h1>Jahresübersicht {selectedYear}</h1>
      <ChartContainer config={chartConfig} className="h-70 md:h-120 w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            width={40} // optional: Platz für Ticks reservieren
          />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="einnahmen" fill="var(--color-einnahmen)" radius={4} />
          <Bar dataKey="ausgaben" fill="var(--color-ausgaben)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export default ChartYearly;