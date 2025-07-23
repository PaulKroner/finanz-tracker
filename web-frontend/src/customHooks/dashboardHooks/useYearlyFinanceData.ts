import { useEffect, useState } from "react";
import axios from "axios";
import { useChartUpdate } from "../../context/ChartUpdateContext";

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

export const useYearlyFinanceData = (selectedYear: number) => {
  const [chartData, setChartData] = useState(
    months.map((month) => ({ month, einnahmen: 0, ausgaben: 0 }))
  );

  const { trigger } = useChartUpdate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [incomeRes, expenseRes] = await Promise.all([
          axios.get<IncomeEntry[]>(`http://localhost:5062/api/income?year=${selectedYear}`),
          axios.get<IncomeEntry[]>(`http://localhost:5062/api/expense?year=${selectedYear}`),
        ]);

        const data = months.map((month) => ({
          month,
          einnahmen: 0,
          ausgaben: 0,
        }));

        incomeRes.data.forEach((entry) => {
          const date = new Date(entry.date);
          if (date.getFullYear() !== selectedYear) return;
          const monthIndex = date.getMonth();
          data[monthIndex].einnahmen += entry.amount;
        });

        expenseRes.data.forEach((entry) => {
          const date = new Date(entry.date);
          if (date.getFullYear() !== selectedYear) return;
          const monthIndex = date.getMonth();
          data[monthIndex].ausgaben += entry.amount;
        });

        setChartData(data);
      } catch (error) {
        console.error("Fehler beim Laden der Daten:", error);
      }
    };

    fetchData();
  }, [selectedYear, trigger]);

  return chartData;
};
