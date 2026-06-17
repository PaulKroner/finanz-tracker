import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"


import { useChartUpdate } from "../../context/ChartUpdateContext";

import MobileDrawerOptions from "./mobile/MobileDrawerOptions";
import DesktopDialogOptions from "./desktop/DesktopDialogOptions";
import type { IncomeEntry } from "../../types/types";
import { apiClient } from "../../api/client";


type ChartYearlProps = {
  selectedYear: number;
};

type ChartMonthProps = {
  selectedMonth: number;
};

type FilterProps = {
  titleFilter: string;
  categoryId: string;
  sortBy: string;
  isDescending: boolean;
};

const DetailsLastIncome = ({ selectedYear, selectedMonth, titleFilter, categoryId, sortBy, isDescending }: ChartYearlProps & ChartMonthProps & FilterProps) => {

  const [entries, setEntries] = useState<IncomeEntry[]>([]);

  const { trigger } = useChartUpdate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeRes = await Promise.all([
          apiClient.get<IncomeEntry[]>("/api/income", {
            params: {
              year: selectedYear,
              month: selectedMonth + 1,
              title: titleFilter || undefined,
              categoryId: categoryId || undefined,
              sortBy,
              isDecending: isDescending,
            },
          }),
        ]);

        const incomeData = incomeRes[0].data.map((entry: any) => ({
          ...entry,
          type: "income",
        }));

        setEntries(incomeData);

      } catch (error) {
        console.error("Error fetching last actions:", error);
      }
    };

    fetchData();
  }, [selectedYear, selectedMonth, titleFilter, categoryId, sortBy, isDescending, trigger]);

  return (
    <div className="border rounded-xl p-4 shadow-sm w-full md:w-150">
      <h2 className="text-lg font-semibold mb-4">Einnahmen</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Datum</TableHead>
            <TableHead>Was</TableHead>
            <TableHead>Betrag</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => {
            const amount = parseFloat(entry.amount.toString()).toFixed(2);
            const formattedDate = new Date(entry.date).toLocaleDateString("de-DE");


            return (
              <TableRow key={entry.id} className="bg-green-400">
                <TableCell className="font-medium">{formattedDate}</TableCell>
                <TableCell className="font-medium">{entry.title}</TableCell>
                <TableCell className="font-medium">
                  {"+ "} {amount} €
                </TableCell>
                <TableCell className="flex justify-center">

                  {/* desktop */}
                  <section className="hidden md:flex">
                    <DesktopDialogOptions
                      entry={entry}
                      setEntries={setEntries}
                    />
                  </section>

                  {/* mobile */}
                  <section className="md:hidden">
                    <MobileDrawerOptions
                      entry={entry}
                      entries={entries}
                      setEntries={setEntries}
                    />
                  </section>

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
