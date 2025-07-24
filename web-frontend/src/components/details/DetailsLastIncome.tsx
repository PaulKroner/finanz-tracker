import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import { BsThreeDots } from "react-icons/bs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"

import axios from "axios";
import { useChartUpdate } from "../../context/ChartUpdateContext";
import DeleteButtonTable from "./DeleteButtonTable";
import EditButtonTable from "./EditButtonTable";
import { Button } from "../ui/button";

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

const DetailsLastIncome = ({ selectedYear, selectedMonth }: ChartYearlProps & ChartMonthProps) => {

  const [latestEntries, setLatestEntries] = useState<any[]>([]);
  const [open, setOpen] = useState(false) // State for closing Popover when Dialog is closed

  const { trigger } = useChartUpdate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeRes = await Promise.all([
          axios.get<IncomeEntry[]>(`http://localhost:5062/api/income?year=${selectedYear}&month=${selectedMonth + 1}`),
        ]);

        const incomeData = incomeRes[0].data.map((entry: any) => ({
          ...entry,
          type: "income",
        }));

        setLatestEntries(incomeData);

      } catch (error) {
        console.error("Error fetching last actions:", error);
      }
    };

    fetchData();
  }, [selectedYear, selectedMonth, trigger]);

  return (
    <div className="border rounded-xl p-4 shadow-sm w-full md:w-150">
      <h2 className="text-lg font-semibold mb-4">Einnahmen</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Datum</TableHead>
            <TableHead>Was</TableHead>
            <TableHead>Betrag</TableHead>
            <TableHead>Optionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {latestEntries.map((entry, index) => {
            const amount = parseFloat(entry.amount).toFixed(2);
            const formattedDate = new Date(entry.date).toLocaleDateString("de-DE");

            return (
              <TableRow key={index} className="bg-green-400">
                <TableCell className="font-medium">{formattedDate}</TableCell>
                <TableCell className="font-medium">{entry.title}</TableCell>
                <TableCell className="font-medium">
                  {"+ "} {amount} €
                </TableCell>
                <TableCell className="flex justify-center">

                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button>
                          <BsThreeDots />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-20 flex flex-col items-center justify-center gap-2">
                      <div className="flex items-center">
                        <DeleteButtonTable onClosePopover={() => setOpen(false)} />
                      </div>
                      <div className="flex items-center">
                        <EditButtonTable onClosePopover={() => setOpen(false)} />
                      </div>
                    </PopoverContent>
                  </Popover>

                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default DetailsLastIncome;