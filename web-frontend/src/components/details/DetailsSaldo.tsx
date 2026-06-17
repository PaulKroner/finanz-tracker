import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import { useMonthlyFinanceData } from "../../customHooks/detailsHooks/useDetailsFinanceData";

type ChartYearlProps = {
  selectedYear: number;
};

type ChartMonthProps = {
  selectedMonth: number;
};

const DetailsSaldo = ({ selectedYear, selectedMonth }: ChartYearlProps & ChartMonthProps) => {

  const chartData = useMonthlyFinanceData(selectedYear, selectedMonth);

  const totalIncome = chartData.einnahmen;
  const totalExpense = chartData.ausgaben;
  const totalDifference = totalIncome - totalExpense;
  const differenceClassName =
    totalDifference > 0
      ? "bg-sky-50 text-sky-950 border-l-4 border-sky-500"
      : totalDifference < 0
        ? "bg-amber-50 text-amber-950 border-l-4 border-amber-500"
        : "bg-slate-50 text-slate-950 border-l-4 border-slate-400";

  return (
    <>
      <div className="border rounded-xl p-4 shadow-sm w-full md:w-150">
        {chartData.month}
        <Table>
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

export default DetailsSaldo;
