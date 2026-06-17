import { useEffect, useState } from "react";
import { toast } from "sonner";
import { deleteBudget, getBudgets, upsertBudget } from "../../api/budgetAPI";
import { useCategories } from "../../customHooks/dashboardHooks/useCategories";
import type { Budget } from "../../types/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import MonthSelect from "../ui/monthSelect";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import YearSelect from "../ui/yearSelect";

const BudgetManager = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [amount, setAmount] = useState("");
  const categories = useCategories().filter((category) => category.type === "expense" || category.type === "both");

  const loadBudgets = async () => {
    const data = await getBudgets(selectedYear, selectedMonth + 1);
    setBudgets(data);
  };

  useEffect(() => {
    loadBudgets().catch(() => toast.error("Budgets konnten nicht geladen werden."));
  }, [selectedYear, selectedMonth]);

  const handleSave = async () => {
    if (!categoryId || !amount) {
      toast.error("Bitte Kategorie und Betrag ausfüllen.");
      return;
    }

    const savedBudget = await upsertBudget({
      categoryId: Number(categoryId),
      year: selectedYear,
      month: selectedMonth + 1,
      amount: Number(amount),
    });

    setBudgets((prev) => [savedBudget, ...prev.filter((budget) => budget.id !== savedBudget.id)]);
    setAmount("");
    toast.success("Budget gespeichert.");
  };

  const handleDelete = async (id: number) => {
    await deleteBudget(id);
    setBudgets((prev) => prev.filter((budget) => budget.id !== id));
    toast.success("Budget gelöscht.");
  };

  return (
    <div className="border rounded-xl p-4 shadow-sm w-full md:w-150">
      <h2 className="text-lg font-semibold mb-4">Budgets</h2>
      <div className="flex flex-col gap-3 mb-4">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-muted-foreground">Jahr</span>
          <YearSelect onYearChange={setSelectedYear} />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-muted-foreground">Monat</span>
          <MonthSelect onMonthChange={setSelectedMonth} />
        </div>
      </div>
      <div className="grid gap-2 md:grid-cols-[1fr_1fr_auto] mb-4">
        <select className="p-2 border rounded" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">Kategorie</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
        <Input type="number" placeholder="Budget in €" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <Button onClick={handleSave}>Speichern</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kategorie</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Ausgegeben</TableHead>
            <TableHead>Rest</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {budgets.map((budget) => (
            <TableRow key={budget.id} className={budget.usagePercent >= 100 ? "bg-red-300" : budget.usagePercent >= 80 ? "bg-yellow-200" : ""}>
              <TableCell>
                <span className="inline-flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full border" style={{ backgroundColor: budget.categoryColor }} />
                  {budget.categoryTitle}
                </span>
              </TableCell>
              <TableCell>{budget.amount.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</TableCell>
              <TableCell>{budget.spent.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</TableCell>
              <TableCell>{budget.remaining.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => handleDelete(budget.id)}>Löschen</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BudgetManager;
