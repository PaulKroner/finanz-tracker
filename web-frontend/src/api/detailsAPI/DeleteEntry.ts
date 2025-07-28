import axios from "axios";
import { toast } from "sonner";

export const deleteEntry = async (id: number, data: any[], setData: (arg0: any) => void, callback?: () => void) => {
  try {
    await axios.delete(`http://localhost:5062/api/income/${id}`, {
      headers: { 'Content-Type': 'application/json' }
    });

    setData(data.filter(entry => entry.id !== id));
    toast.success("Löschung erfolgreich!");
    if (callback) callback();
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      toast.error("Fehler beim Löschen (Serverantwort).");
    } else {
      toast.error("Unbekannter Fehler beim Löschen.");
    }
  }
};
