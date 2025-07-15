import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"


const DashboardSaldo = () => {
  return (
    <>
      <Table className="">
        <TableCaption>Saldo gesamt</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Einnahmen/Ausgaben-Differenz</TableHead>
            {/* <TableHead>Summe</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium bg-green-400">Einnahmen gesamt:</TableCell>
            <TableCell className="text-right bg-green-400">250.00 €</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium bg-red-400">Ausgaben gesamt:</TableCell>
            <TableCell className="text-right bg-red-400">250.00 €</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium bg-gray-400">Differenz gesamt:</TableCell>
            <TableCell className="text-right bg-gray-400">250.00 €</TableCell>
          </TableRow>
        </TableBody>
      </Table>

    </>
  );
}

export default DashboardSaldo;