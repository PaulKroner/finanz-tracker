import axios from "axios";
import type { CategorySummary } from "../../types/types";
import { toast } from "sonner";

export const getSumCategory = async (selectedYear: number, selectedMonth: number, setCategorySummary: React.Dispatch<React.SetStateAction<CategorySummary[]>>, token: string | null) => {

  try {
    const response = await axios.get<CategorySummary[]>(
      `http://localhost:5062/api/expense/category-summary`,
      {
        params: {
          year: selectedYear,
          month: selectedMonth + 1
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setCategorySummary(response.data);
  } catch (err) {
    toast.error("Fehler beim Laden der Kategoriedaten.");
  }
};