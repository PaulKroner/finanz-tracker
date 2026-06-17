import { toast } from "sonner";
import { getExportUrl, importFinanceCsv } from "../../api/financeFileAPI";
import { useChartUpdate } from "../../context/ChartUpdateContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type FinanceFileActionsProps = {
  selectedYear: number;
  selectedMonth: number;
};

const FinanceFileActions = ({ selectedYear, selectedMonth }: FinanceFileActionsProps) => {
  const { refresh } = useChartUpdate();

  const handleImport = async (file?: File) => {
    if (!file) {
      return;
    }

    const result = await importFinanceCsv(file);
    refresh();
    toast.success(`${result.imported} Buchungen importiert.`);
  };

  return (
    <div className="border rounded-xl p-4 shadow-sm w-full md:w-150">
      <h2 className="text-lg font-semibold mb-4">Import und Export</h2>
      <div className="flex flex-col md:flex-row gap-2">
        <Button asChild>
          <a href={getExportUrl(selectedYear, selectedMonth + 1)}>CSV exportieren</a>
        </Button>
        <Input type="file" accept=".csv,text/csv" onChange={(event) => handleImport(event.target.files?.[0])} />
      </div>
    </div>
  );
};

export default FinanceFileActions;
