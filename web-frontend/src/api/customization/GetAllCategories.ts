import type { Category } from "../../types/types";
import { toast } from "sonner";
import { apiClient } from "../client";

export const getAllCategories = async () => {
  try {
    const response = await apiClient.get<Category[]>("/api/category");
    return response.data;
  } catch (err) {
    toast.error("Fehler beim Laden der Kategorien.");
    throw err;
  }
}
