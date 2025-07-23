import { useCategoryExpenseData } from "../../customHooks/dashboardHooks/useCategoryExpenseData"
import { LabelList, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import type { ChartConfig } from "../../components/ui/chart"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart"

const chartConfig = {
  // necessary for the chart to work
} satisfies ChartConfig

export const description = "A pie chart with a label list"

type ChartYearlyProps = {
  selectedYear: number;
};

const ChartCategoryYearly = ({ selectedYear }: ChartYearlyProps) => {

  const chartData = useCategoryExpenseData(selectedYear);

  return (
    <div>

      <Card className="flex flex-col py-0 pt-6">
        <CardHeader className="items-center pb-0">
          <CardTitle>Ausgaben nach Kategorie</CardTitle>
          <CardDescription>{selectedYear}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[350px]"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="amount" hideLabel />} />
              <Pie data={chartData} dataKey="amount" nameKey="category">
                <LabelList
                  dataKey="category"
                  className="fill-background"
                  stroke="none"
                  fontSize={14}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default ChartCategoryYearly;