import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
  TableData,
  TableFooter,
} from '@/components/ui/table';
import { useYearlyFinanceData } from '@/hooks/useYearlyFinanceData';


type ChartYearlyProps = {
  selectedYear: number;
};

const DashboardSaldo = ({ selectedYear }: ChartYearlyProps) => {

  const chartData = useYearlyFinanceData(2025);

  // Einnahmen und Ausgaben summieren
  const totalIncome = chartData.reduce((sum, entry) => sum + entry.einnahmen, 0);
  const totalExpense = chartData.reduce((sum, entry) => sum + entry.ausgaben, 0);
  const totalDifference = totalIncome - totalExpense;

  return (
    <>
      <Table className="w-full border rounded-xl p-4">
        <TableHeader>
          <TableRow>
            <TableHead>Einnahmen gesamt:</TableHead>
            <TableHead>Ausgaben gesamt:</TableHead>
            <TableHead>Differenz gesamt:</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableData>
              {totalIncome.toLocaleString('de-DE', {
                style: 'currency',
                currency: 'EUR',
              })}
            </TableData>
            <TableData>
              {totalExpense.toLocaleString('de-DE', {
                style: 'currency',
                currency: 'EUR',
              })}
            </TableData>
            <TableData>
              {totalDifference.toLocaleString('de-DE', {
                style: 'currency',
                currency: 'EUR',
              })}
            </TableData>
          </TableRow>
        </TableBody>
      </Table>

    </>
  );
}

export default DashboardSaldo;