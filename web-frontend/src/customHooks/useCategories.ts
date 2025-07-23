import { useEffect, useState } from "react";
import axios from "axios";

export type Category = {
  id: number;
  title: string;
};

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get<Category[]>("http://localhost:5062/api/category");
        setCategories(res.data);
      } catch (error) {
        console.error("Fehler beim Laden der Kategorien:", error);
      }
    };

    fetchCategories();
  }, []);

  return categories;
};
