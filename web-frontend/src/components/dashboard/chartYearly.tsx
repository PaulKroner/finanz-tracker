import { useEffect, useState } from "react";
import axios from "axios";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import type { ChartConfig } from "../../components/ui/chart"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "../../components/ui/chart"

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

const months = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember"
];

type IncomeEntry = {
  id: number;
  title: string;
  amount: number;
  categoryId: number;
  date: string;
};

const TestGraph = () => {
  const [chartData, setChartData] = useState(
    months.map((month) => ({ month, einnahmen: 0, ausgaben: 0 }))
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [incomeRes, expenseRes] = await Promise.all([
          axios.get<IncomeEntry[]>("http://localhost:5062/api/income"),
          axios.get<IncomeEntry[]>("http://localhost:5062/api/expense"),
        ]);

        const data = months.map((month) => ({
          month,
          einnahmen: 0,
          ausgaben: 0,
        }));

        // Process incomes
        incomeRes.data.forEach((entry) => {
          const date = new Date(entry.date);
          const monthIndex = date.getMonth();
          data[monthIndex].einnahmen += entry.amount;
        });

        // Process expenses
        expenseRes.data.forEach((entry) => {
          const date = new Date(entry.date);
          const monthIndex = date.getMonth();
          data[monthIndex].ausgaben += entry.amount;
        });

        setChartData(data);
      } catch (error) {
        console.error("Fehler beim Laden der Daten:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Yearly Chart</h1>
      <ChartContainer config={chartConfig} className="h-70 md:h-120 w-full md:px-12 xl:px-40">
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

export default TestGraph;