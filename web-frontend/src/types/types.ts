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
