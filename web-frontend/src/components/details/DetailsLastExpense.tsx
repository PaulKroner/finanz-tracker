import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import axios from "axios";
import { useChartUpdate } from "../../context/ChartUpdateContext";

type IncomeEntry = {
  id: number;
  title: string;
  amount: number;
  categoryId: number;
  date: string;
};

type ChartYearlProps = {
  selectedYear: number;
};

type ChartMonthProps = {
  selectedMonth: number;
};

const DetailsLastExpense = ({ selectedYear, selectedMonth }: ChartYearlProps & ChartMonthProps) => {

  const [latestEntries, setLatestEntries] = useState<any[]>([]);

  const { trigger } = useChartUpdate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expenseRes = await Promise.all([
          axios.get<IncomeEntry[]>(`http://localhost:5062/api/expense?year=${selectedYear}&month=${selectedMonth + 1}`),
        ]);

        const expenseData = expenseRes[0].data.map((entry: any) => ({
          ...entry,
          type: "expense",
        }));

        setLatestEntries(expenseData);

      } catch (error) {
        console.error("Error fetching last actions:", error);
      }
    };

    fetchData();
  }, [selectedYear, selectedMonth, trigger]);

  return (
    <div className="border rounded-xl p-6 shadow-sm w-full md:w-150">
      <h2 className="text-lg font-semibold mb-4">Ausgaben</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Datum</TableHead>
            <TableHead>Was</TableHead>
            <TableHead>Betrag</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {latestEntries.map((entry, index) => {
            const amount = parseFloat(entry.amount).toFixed(2);
            const formattedDate = new Date(entry.date).toLocaleDateString("de-DE");

            return (
              <TableRow key={index} className="bg-red-400">
                <TableCell className="font-medium">{formattedDate}</TableCell>
                <TableCell className="font-medium">{entry.title}</TableCell>
                <TableCell className="font-medium">
                  {"+ "} {amount} €
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default DetailsLastExpense;