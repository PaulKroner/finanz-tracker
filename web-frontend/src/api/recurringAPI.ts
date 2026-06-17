import type { RecurringTransaction } from "../types/types";
import { apiClient } from "./client";

export type UpsertRecurringTransaction = {
  title: string;
  amount: number;
  categoryId: number;
  type: "income" | "expense";
  frequency: "weekly" | "monthly" | "yearly";
  nextRunDate: string;
  isActive: boolean;
};

export const getRecurringTransactions = async () => {
  const response = await apiClient.get<RecurringTransaction[]>("/api/recurring");
  return response.data;
};

export const createRecurringTransaction = async (recurring: UpsertRecurringTransaction) => {
  const response = await apiClient.post<RecurringTransaction>("/api/recurring", recurring);
  return response.data;
};

export const deleteRecurringTransaction = async (id: number) => {
  await apiClient.delete(`/api/recurring/${id}`);
};

export const runDueRecurringTransactions = async () => {
  const response = await apiClient.post<{ created: number }>("/api/recurring/run-due");
  return response.data;
};
