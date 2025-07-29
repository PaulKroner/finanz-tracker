import axios from "axios";
import { toast } from "sonner";

export const updateEntry = async ( id:number, updatedEntry: any) => {
  // setLoading(true);
  try {
    const response = await axios.put(`http://localhost:5062/api/income/${id}`, updatedEntry, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: { id },
    });

    if (response.status === 200) {
      // function to update the table without refreshing the page
      // const updatedData = await getData();
      // setData(updatedData);
      // setLastEntries(response);
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