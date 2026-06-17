import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  createRecurringTransaction,
  deleteRecurringTransaction,
  getRecurringTransactions,
  runDueRecurringTransactions,
} from "../../api/recurringAPI";
import { useCategories } from "../../customHooks/dashboardHooks/useCategories";
import type { RecurringTransaction } from "../../types/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Select from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const RecurringManager = () => {
  const [recurringTransactions, setRecurringTransactions] = useState<RecurringTransaction[]>([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [frequency, setFrequency] = useState<"weekly" | "monthly" | "yearly">("monthly");
  const [nextRunDate, setNextRunDate] = useState(new Date().toISOString().slice(0, 10));
  const categories = useCategories().filter((category) => category.type === type || category.type === "both");

  const loadRecurringTransactions = async () => {
    const data = await getRecurringTransactions();
    setRecurringTransactions(data);
  };

  useEffect(() => {
    loadRecurringTransactions().catch(() => toast.error("Wiederholungen konnten nicht geladen werden."));
  }, []);

  const handleCreate = async () => {
    if (!title || !amount || !categoryId || !nextRunDate) {
      toast.error("Bitte alle Felder ausfüllen.");
      return;
    }

    const created = await createRecurringTransaction({
      title,
      amount: Number(amount),
      categoryId: Number(categoryId),
      type,
      frequency,
      nextRunDate,
      isActive: true,
    });

    setRecurringTransactions((prev) => [created, ...prev]);
    setTitle("");
    setAmount("");
    toast.success("Wiederholung gespeichert.");
  };

  const handleRunDue = async () => {
    const result = await runDueRecurringTransactions();
    await loadRecurringTransactions();
    toast.success(`${result.created} Buchungen erzeugt.`);
  };

  const handleDelete = async (id: number) => {
    await deleteRecurringTransaction(id);
    setRecurringTransactions((prev) => prev.filter((recurring) => recurring.id !== id));
    toast.success("Wiederholung gelöscht.");
  };

  return (
    <div className="border rounded-xl p-4 shadow-sm w-full md:w-150">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="text-lg font-semibold">Wiederkehrende Buchungen</h2>
        <Button variant="outline" onClick={handleRunDue}>Fällige buchen</Button>
      </div>
      <div className="grid gap-2 mb-4 md:grid-cols-2">
        <Input placeholder="Titel" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input type="number" placeholder="Betrag" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <Select
          value={type}
          onValueChange={(value) => {
            setType(value as "income" | "expense");
            setCategoryId("");
          }}
          options={[
            { value: "expense", label: "Ausgabe" },
            { value: "income", label: "Einnahme" },
          ]}
        />
        <Select
          value={categoryId}
          onValueChange={setCategoryId}
          placeholder="Kategorie"
          options={categories.map((category) => ({ value: category.id.toString(), label: category.title }))}
        />
        <Select
          value={frequency}
          onValueChange={(value) => setFrequency(value as "weekly" | "monthly" | "yearly")}
          options={[
            { value: "weekly", label: "Wöchentlich" },
            { value: "monthly", label: "Monatlich" },
            { value: "yearly", label: "Jährlich" },
          ]}
        />
        <Input type="date" value={nextRunDate} onChange={(e) => setNextRunDate(e.target.value)} />
        <Button className="md:col-span-2" onClick={handleCreate}>Wiederholung speichern</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titel</TableHead>
            <TableHead>Typ</TableHead>
            <TableHead>Betrag</TableHead>
            <TableHead>Nächste Buchung</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recurringTransactions.map((recurring) => (
            <TableRow key={recurring.id}>
              <TableCell>{recurring.title}</TableCell>
              <TableCell>{recurring.type === "income" ? "Einnahme" : "Ausgabe"}</TableCell>
              <TableCell>{recurring.amount.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</TableCell>
              <TableCell>{new Date(recurring.nextRunDate).toLocaleDateString("de-DE")}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => handleDelete(recurring.id)}>Löschen</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecurringManager;
