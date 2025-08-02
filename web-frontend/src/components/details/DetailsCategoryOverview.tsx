import { useEffect, useState } from "react";
import type { CategorySummary } from "../../types/types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import { getSumCategory } from "../../api/detailsAPI/GetSumCategory";
import { toast } from "sonner";

type DetailsCategoryOverviewProps = {
  selectedYear: number;
  selectedMonth: number;
}

const DetailsCategoryOverview = ({ selectedYear, selectedMonth }: DetailsCategoryOverviewProps) => {
  const [categorySummary, setCategorySummary] = useState<CategorySummary[]>([]);

  useEffect(() => {
    try {
      getSumCategory(selectedYear, selectedMonth, setCategorySummary);
    }
    catch (err) {
      toast.error("Fehler beim Laden der Kategoriedaten.");
    }
  }, [selectedYear, selectedMonth]);


  return (
    <div className="border rounded-xl p-4 shadow-sm w-full md:w-150">
      <h2 className="text-lg font-semibold mb-4">Ausgaben nach Kategorien</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Kategorie</TableHead>
            <TableHead className="w-[200px]">Betrag</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categorySummary.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.totalAmount.toFixed(2)} €</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DetailsCategoryOverview;