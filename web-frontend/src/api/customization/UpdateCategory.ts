import axios from "axios";
import { toast } from "sonner";

export const updateCategory = async (id: number, updatedCategory: any) => {
  try {
    const response = await axios.put(`http://localhost:5062/api/category/${id}`, updatedCategory, {
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
    if (axios.isAxiosError(error) && error.response) {
      toast.error("Fehler beim Aktualisieren der Kategorie (Serverantwort).");
    } else {
      toast.error("Unbekannter Fehler beim Aktualisieren der Kategorie.");
    }
  }
}