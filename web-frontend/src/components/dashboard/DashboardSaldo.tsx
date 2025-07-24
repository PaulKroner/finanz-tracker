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
            <TableRow>
              <TableCell className="font-medium bg-green-400">Einnahmen gesamt:</TableCell>
              <TableCell className="text-right bg-green-400">
                {totalIncome.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium bg-red-400">Ausgaben gesamt:</TableCell>
              <TableCell className="text-right bg-red-400">
                {totalExpense.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium bg-gray-400">Differenz gesamt:</TableCell>
              <TableCell className="text-right bg-gray-400">
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