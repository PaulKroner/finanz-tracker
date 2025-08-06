import axios from "axios";
import type { UserProfileToken } from "../../types/types";
import { toast } from "sonner";

const api = "http://localhost:5062/api/";

export const loginAPI = async (username: string, password: string) => {
  try {
    const response = await axios.post<UserProfileToken>(api + "account/login", {
      username,
      password
    });

    return response;
  } catch (error) {
    toast.error("Login fehlgeschlagen. Bitte überprüfe deine Anmeldedaten.");
  }
}