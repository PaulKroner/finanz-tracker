import axios from "axios";
import { toast } from "sonner";

type NewCategory = { title: string };

export const postCategory = async (newCategory: NewCategory) => {
  try {
    const response = await axios.post(`http://localhost:5062/api/category`, newCategory, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    toast.success("Kategorie erfolgreich erstellt!");
    return response.data;
  } catch (error) {

    if (axios.isAxiosError(error) && error.response) {
      toast.error("Fehler beim Erstellen der Kategorie (Serverantwort).");
      console.error('Server response:', error.response.data);
    } else {
      toast.error("Unbekannter Fehler beim Erstellen der Kategorie.");
    }
  }
}