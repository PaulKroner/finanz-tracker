import axios from "axios";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"


type IncomeEntry = {
  id: number;
  title: string;
  amount: number;
  categoryId: number;
  date: string;
};

const LastActions = () => {

  const [latestEntries, setLatestEntries] = useState<any[]>([]);


  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [incomeRes, expensesRes] = await Promise.all([
          axios.get<IncomeEntry[]>(`http://localhost:5062/api/income?year=${currentYear}`),
          axios.get<IncomeEntry[]>(`http://localhost:5062/api/expense?year=${currentYear}`)
        ]);

        const incomeData = incomeRes.data.map((entry: any) => ({
          ...entry,
          type: "income",
        }));

        const expensesData = expensesRes.data.map((entry: any) => ({
          ...entry,
          type: "expense",
        }));

        // Combine, sort by date, and take the latest 10
        const combined = [...incomeData, ...expensesData]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 10);

        setLatestEntries(combined);

      } catch (error) {
        console.error("Error fetching last actions:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="border rounded-xl p-6 shadow-sm">
        <Table className="">
          {/* <TableCaption>Saldo gesamt</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Datum</TableHead>
              <TableHead className="w-[200px]">Was</TableHead>
              <TableHead className="w-[200px]">Betrag</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {latestEntries.map((entry, index) => {
              const isIncome = entry.type === "income";
              const amount = parseFloat(entry.amount).toFixed(2);
              const formattedDate = new Date(entry.date).toLocaleDateString("de-DE");

              return (
                <TableRow key={index} className={isIncome ? "bg-green-400" : "bg-red-400"}>
                  <TableCell className="font-medium">{formattedDate}</TableCell>
                  <TableCell className="font-medium">{entry.title}</TableCell>
                  <TableCell className="font-medium">
                    {isIncome ? "+ " : "- "} {amount} €
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default LastActions;