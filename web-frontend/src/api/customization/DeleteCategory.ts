import axios from "axios";
import { toast } from "sonner";

export const deleteCategory = async (category: any, setCategories: (arg0: any) => void, callback?: () => void) => {

  const { id } = category;
  try {
    await axios.delete(`http://localhost:5062/api/category/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      params: { id },
    });

    setCategories((prev: any[]) => prev.filter((category) => category.id !== id));
    toast.success("Kategorie erfolgreich gelöscht!");
    if (callback) callback();
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      toast.error("Fehler beim Löschen der Kategorie (Serverantwort).");
    } else {
      toast.error("Unbekannter Fehler beim Löschen der Kategorie.");
    }
  }
}