import axios from "axios";
import type { UserProfileToken } from "../../types/types";
import { toast } from "sonner";

const api = "http://localhost:5062/api/";

export const loginAPI = async (username: string, password: string, navigate: any ) => {
  try {
    const response = await axios.post<UserProfileToken>(api + "account/login", {
      username,
      password
    });
    if (localStorage.getItem('token')) {
      navigate("/dashboard");
    }

    return response;
  } catch (error) {
    toast.error("Login fehlgeschlagen. Bitte überprüfe deine Anmeldedaten.");
  }
}