import { toast } from "sonner";
import { apiClient } from "../client";

export const updateCategory = async (id: number, updatedCategory: any) => {
  try {
    const response = await apiClient.put(`/api/category/${id}`, updatedCategory, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: { id },
    });

    if (response.status === 200) {
      toast.success("Kategorie erfolgreich aktualisiert!");
    }
    return response.data;
  } catch (error) {
    if (error && typeof error === "object" && "response" in error) {
      toast.error("Fehler beim Aktualisieren der Kategorie (Serverantwort).");
    } else {
      toast.error("Unbekannter Fehler beim Aktualisieren der Kategorie.");
    }
  }
}
