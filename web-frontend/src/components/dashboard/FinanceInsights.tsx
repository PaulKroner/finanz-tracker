import { useMemo } from "react";
import { useYearlyFinanceData } from "../../customHooks/dashboardHooks/useYearlyFinanceData";

type FinanceInsightsProps = {
  selectedYear: number;
};

const FinanceInsights = ({ selectedYear }: FinanceInsightsProps) => {
  const chartData = useYearlyFinanceData(selectedYear);

  const insights = useMemo(() => {
    const totalIncome = chartData.reduce((sum, entry) => sum + entry.einnahmen, 0);
    const totalExpense = chartData.reduce((sum, entry) => sum + entry.ausgaben, 0);
    const balance = totalIncome - totalExpense;
    const savingsRate = totalIncome > 0 ? (balance / totalIncome) * 100 : 0;
    const activeMonths = chartData.filter((entry) => entry.einnahmen > 0 || entry.ausgaben > 0);
    const averageExpense = activeMonths.length > 0 ? totalExpense / activeMonths.length : 0;
    const highestExpenseMonth = [...chartData].sort((a, b) => b.ausgaben - a.ausgaben)[0];

    return {
      balance,
      savingsRate,
      averageExpense,
      highestExpenseMonth,
    };
  }, [chartData]);

  return (
    <div className="border rounded-xl p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Kennzahlen</h2>
      <div className="grid gap-3 md:grid-cols-4">
        <div className="rounded-lg border p-3">
          <div className="text-sm text-muted-foreground">Jahressaldo</div>
          <div className="text-xl font-semibold">{insights.balance.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</div>
        </div>
        <div className="rounded-lg border p-3">
          <div className="text-sm text-muted-foreground">Sparquote</div>
          <div className="text-xl font-semibold">{insights.savingsRate.toFixed(1)} %</div>
        </div>
        <div className="rounded-lg border p-3">
          <div className="text-sm text-muted-foreground">Ø Ausgaben</div>
          <div className="text-xl font-semibold">{insights.averageExpense.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</div>
        </div>
        <div className="rounded-lg border p-3">
          <div className="text-sm text-muted-foreground">Teuerster Monat</div>
          <div className="text-xl font-semibold">{insights.highestExpenseMonth?.month ?? "-"}</div>
        </div>
      </div>
    </div>
  );
};

export default FinanceInsights;
