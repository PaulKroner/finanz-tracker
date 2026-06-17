import { useEffect, useState } from "react";
import { apiClient } from "../../api/client";

export type Category = {
  id: number;
  title: string;
  type: "income" | "expense" | "both";
  color: string;
  icon: string;
};

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiClient.get<Category[]>("/api/category");
        setCategories(res.data);
      } catch (error) {
        console.error("Fehler beim Laden der Kategorien:", error);
      }
    };

    fetchCategories();
  }, []);

  return categories;
};
