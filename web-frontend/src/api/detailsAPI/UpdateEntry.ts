import axios from "axios";
import { toast } from "sonner";

export const updateEntry = async ( id:number, updatedEntry: any, token: string| null ) => {
  // setLoading(true);
  try {
    const response = await axios.put(`http://localhost:5062/api/${updatedEntry.selected}/${id}`, updatedEntry, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      params: { id },
    });

    if (response.status === 200) {
      toast.success("Eintrag erfolgreich aktualisiert!");
    }
    return response.data;
    // setLoading(false);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      toast.error("Fehler beim Updaten (Serverantwort).");
    } else {
      toast.error("Unbekannter Fehler beim Updaten.");
    }
  }
  // setLoading(false);
};