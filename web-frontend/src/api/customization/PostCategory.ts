import { toast } from "sonner";
import { apiClient } from "../client";

type NewCategory = { title: string; type: string; color: string; icon: string };

export const postCategory = async (newCategory: NewCategory) => {
  try {
    const response = await apiClient.post("/api/category", newCategory, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    toast.success("Kategorie erfolgreich erstellt!");
    return response.data;
  } catch (error) {

    if (error && typeof error === "object" && "response" in error) {
      toast.error("Fehler beim Erstellen der Kategorie (Serverantwort).");
    } else {
      toast.error("Unbekannter Fehler beim Erstellen der Kategorie.");
    }
  }
}
