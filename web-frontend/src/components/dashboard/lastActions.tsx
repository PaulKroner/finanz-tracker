import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"

const LastActions = () => {

  return (
    <>
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
          <TableRow className="bg-red-400">
            <TableCell className="font-medium">21.12.2024</TableCell>
            <TableCell className="font-medium">Kauf bei Steam</TableCell>
            <TableCell className="font-medium">- 5.00 €</TableCell>
          </TableRow>

          <TableRow className="bg-green-400">
            <TableCell className="font-medium">19.11.2024</TableCell>
            <TableCell className="font-medium">Verkauf eBay</TableCell>
            <TableCell className="font-medium">+ 20.00 €</TableCell>
          </TableRow>

        </TableBody>
      </Table>

    </>
  );
}

export default LastActions;