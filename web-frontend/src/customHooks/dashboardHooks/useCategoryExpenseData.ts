import { useEffect, useState } from "react";
import axios from "axios";
import { useChartUpdate } from "../../context/ChartUpdateContext";

type ExpenseEntry = {
  id: number;
  title: string;
  amount: number;
  categoryId: number;
  date: string;
};

type Category = {
  id: number;
  title: string;
};

type CategoryChartData = {
  category: string;
  amount: number;
  fill: string;
};

const categoryColors: Record<number, string> = {
  1: "var(--chart-1)",
  2: "var(--chart-2)",
  3: "var(--chart-3)",
  4: "var(--chart-4)",
};

export const useCategoryExpenseData = (selectedYear: number) => {
  const [chartData, setChartData] = useState<CategoryChartData[]>([]);
  const { trigger } = useChartUpdate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expenseRes, categoriesRes] = await Promise.all([
          axios.get<ExpenseEntry[]>(`http://localhost:5062/api/expense?year=${selectedYear}`),
          axios.get<Category[]>(`http://localhost:5062/api/category`)
        ]);

        const categoriesMap = new Map<number, { name: string; color: string }>();
        categoriesRes.data.forEach((cat) => {
          categoriesMap.set(cat.id, { name: cat.title, color: categoryColors[cat.id] || "var(--chart-other)" });
        });

        const categoryTotals: Record<number, number> = {};

        expenseRes.data.forEach((entry) => {
          const date = new Date(entry.date);
          if (date.getFullYear() !== selectedYear) return;

          const catId = entry.categoryId;
          categoryTotals[catId] = (categoryTotals[catId] || 0) + entry.amount;
        });

        const transformedData: CategoryChartData[] = Object.entries(categoryTotals).map(
          ([catIdStr, amount]) => {
            const catId = parseInt(catIdStr, 10);
            const category = categoriesMap.get(catId);

            return {
              category: category?.name ?? `Kategorie ${catId}`,
              amount,
              fill: category?.color ?? "var(--chart-other)",
            };
          }
        );

        setChartData(transformedData);
      } catch (error) {
        console.error("Fehler beim Laden der Kategoriedaten:", error);
      }
    };

    fetchData();
  }, [selectedYear, trigger]);

  return chartData;
};