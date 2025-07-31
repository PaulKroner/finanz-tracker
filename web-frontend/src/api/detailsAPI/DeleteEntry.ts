import axios from "axios";
import { toast } from "sonner";

export const deleteEntry = async (entry: any, setEntries: (arg0: any) => void, callback?: () => void) => {

  const { id, type } = entry;
  console.log("Deleting entry with ID:", id, "and type:", type);

  try {
    await axios.delete(`http://localhost:5062/api/${type}/${id}`, {
      headers: { 'Content-Type': 'application/json' }
    });

    setEntries((prev: any[]) => prev.filter((e) => e.id !== id));
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
