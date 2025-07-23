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

  return (
    <>
      <div className="border rounded-xl p-6 shadow-sm">
        {chartData.month}
        <Table className="">
          {/* <TableCaption>Saldo gesamt</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Einnahmen/Ausgaben-Differenz</TableHead>
              {/* <TableHead>Summe</TableHead> */}
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

export default DetailsSaldo;