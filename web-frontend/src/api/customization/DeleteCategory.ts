import { toast } from "sonner";
import { apiClient } from "../client";

export const deleteCategory = async (category: any, setCategories: (arg0: any) => void, callback?: () => void) => {

  const { id } = category;
  try {
    await apiClient.delete(`/api/category/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      params: { id },
    });

    setCategories((prev: any[]) => prev.filter((category) => category.id !== id));
    toast.success("Kategorie erfolgreich gelöscht!");
    if (callback) callback();
  } catch (error) {
    if (error && typeof error === "object" && "response" in error) {
      toast.error("Fehler beim Löschen der Kategorie (Serverantwort).");
    } else {
      toast.error("Unbekannter Fehler beim Löschen der Kategorie.");
    }
  }
}
