import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import { useYearlyFinanceData } from "../../customHooks/dashboardHooks/useYearlyFinanceData";

type ChartYearlyProps = {
  selectedYear: number;
};

const DashboardSaldo = ({ selectedYear }: ChartYearlyProps) => {

  const chartData = useYearlyFinanceData(selectedYear);

  // Einnahmen und Ausgaben summieren
  const totalIncome = chartData.reduce((sum, entry) => sum + entry.einnahmen, 0);
  const totalExpense = chartData.reduce((sum, entry) => sum + entry.ausgaben, 0);
  const totalDifference = totalIncome - totalExpense;
  const differenceClassName =
    totalDifference > 0
      ? "bg-sky-50 text-sky-950 border-l-4 border-sky-500"
      : totalDifference < 0
        ? "bg-amber-50 text-amber-950 border-l-4 border-amber-500"
        : "bg-slate-50 text-slate-950 border-l-4 border-slate-400";

  return (
    <>
      <div className="border rounded-xl p-4 shadow-sm">
        <Table className="">
          {/* <TableCaption>Saldo gesamt</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Einnahmen/Ausgaben-Differenz</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-emerald-50 text-emerald-950 border-l-4 border-emerald-500">
              <TableCell className="font-medium">Einnahmen gesamt:</TableCell>
              <TableCell className="text-right font-semibold text-emerald-700">
                {totalIncome.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}
              </TableCell>
            </TableRow>
            <TableRow className="bg-rose-50 text-rose-950 border-l-4 border-rose-500">
              <TableCell className="font-medium">Ausgaben gesamt:</TableCell>
              <TableCell className="text-right font-semibold text-rose-700">
                {totalExpense.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}
              </TableCell>
            </TableRow>
            <TableRow className={differenceClassName}>
              <TableCell className="font-medium">Differenz gesamt:</TableCell>
              <TableCell className="text-right font-semibold">
                {totalDifference.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default DashboardSaldo;
