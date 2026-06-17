export interface IncomeEntry {
  id: number;
  title: string;
  amount: number;
  categoryId: number;
  date: string; // oder Date, je nach Verwendung
  category?: {
    id: number;
    title: string;
  };
  type?: "income"; // optional, falls du es brauchst
}

export interface ExpenseEntry {
  id: number;
  title: string;
  amount: number;
  categoryId: number;
  date: string;
  category?: {
    id: number;
    title: string;
  };
  type?: "expense";
}

export interface Category {
  id: number;
  title: string;
  type: "income" | "expense" | "both";
  color: string;
  icon: string;
}

export interface CategorySummary {
  category: string;
  totalAmount: number;
}

export interface Budget {
  id: number;
  categoryId: number;
  categoryTitle: string;
  categoryColor: string;
  year: number;
  month: number;
  amount: number;
  spent: number;
  remaining: number;
  usagePercent: number;
}

export interface RecurringTransaction {
  id: number;
  title: string;
  amount: number;
  categoryId: number;
  categoryTitle: string;
  type: "income" | "expense";
  frequency: "weekly" | "monthly" | "yearly";
  nextRunDate: string;
  lastRunDate?: string | null;
  isActive: boolean;
}
