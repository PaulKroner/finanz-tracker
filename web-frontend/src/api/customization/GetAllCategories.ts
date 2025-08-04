import axios from "axios";
import type { Category } from "../../types/types";
import { toast } from "sonner";

export const getAllCategories = async () => {
  try {
    const response = await axios.get<Category[]>(
      `http://localhost:5062/api/category`
    );
    return response.data;
  } catch (err) {
    toast.error("Fehler beim Laden der Kategorien.");
    throw err;
  }
}
