import type { Budget } from "../types/types";
import { apiClient } from "./client";

export type UpsertBudget = {
  categoryId: number;
  year: number;
  month: number;
  amount: number;
};

export const getBudgets = async (year?: number, month?: number) => {
  const response = await apiClient.get<Budget[]>("/api/budget", {
    params: { year, month },
  });
  return response.data;
};

export const upsertBudget = async (budget: UpsertBudget) => {
  const response = await apiClient.post<Budget>("/api/budget", budget);
  return response.data;
};

export const deleteBudget = async (id: number) => {
  await apiClient.delete(`/api/budget/${id}`);
};
