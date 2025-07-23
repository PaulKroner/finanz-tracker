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

type MonthlyFinanceData = {
  month: string;
  einnahmen: number;
  ausgaben: number;
};

export const useMonthlyFinanceData = (selectedYear: number, selectedMonth: number) => {
  const [monthlyData, setMonthlyData] = useState<MonthlyFinanceData>({
    month: months[selectedMonth],
    einnahmen: 0,
    ausgaben: 0,
  });

  const { trigger } = useChartUpdate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [incomeRes, expenseRes] = await Promise.all([
          axios.get<IncomeEntry[]>(
            `http://localhost:5062/api/income?year=${selectedYear}&month=${selectedMonth + 1}`
          ),
          axios.get<IncomeEntry[]>(
            `http://localhost:5062/api/expense?year=${selectedYear}&month=${selectedMonth + 1}`
          ),
        ]);

        let einnahmen = 0;
        let ausgaben = 0;

        incomeRes.data.forEach((entry) => {
          einnahmen += entry.amount;
        });

        expenseRes.data.forEach((entry) => {
          ausgaben += entry.amount;
        });

        setMonthlyData({
          month: months[selectedMonth],
          einnahmen,
          ausgaben,
        });
      } catch (error) {
        console.error("Fehler beim Laden der Monatsdaten:", error);
      }
    };

    fetchData();
  }, [selectedYear, selectedMonth, trigger]);

  return monthlyData;
};