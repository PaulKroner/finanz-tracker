"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import type { ChartConfig } from "../../components/ui/chart"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "../../components/ui/chart"

const chartConfig = {
  einnahmen: {
    label: "Einnahmen",
    color: "#4ade80",
  },
  ausgaben: {
    label: "Ausgaben",
    color: "#f87171",
  },
} satisfies ChartConfig

const ChartYearly = () => {
  const chartData = [
    { month: "Januar", einnahmen: 186, ausgaben: 80 },
    { month: "Februar", einnahmen: 305, ausgaben: 200 },
    { month: "März", einnahmen: 237, ausgaben: 120 },
    { month: "April", einnahmen: 73, ausgaben: 190 },
    { month: "Mai", einnahmen: 209, ausgaben: 130 },
    { month: "Juni", einnahmen: 214, ausgaben: 140 },
    { month: "Juli", einnahmen: 214, ausgaben: 140 },
    { month: "August", einnahmen: 214, ausgaben: 140 },
    { month: "September", einnahmen: 214, ausgaben: 140 },
    { month: "Oktober", einnahmen: 214, ausgaben: 140 },
    { month: "November", einnahmen: 214, ausgaben: 140 },
    { month: "Dezember", einnahmen: 214, ausgaben: 140 },
  ]

  return (
    <div>
      <h1>Yearly Chart</h1>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
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