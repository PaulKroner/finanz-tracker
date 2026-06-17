import { API_BASE_URL, apiClient } from "./client";

export const getExportUrl = (year?: number, month?: number) => {
  const params = new URLSearchParams();
  if (year) params.set("year", year.toString());
  if (month) params.set("month", month.toString());
  const query = params.toString();
  return `${API_BASE_URL}/api/finance-file/export${query ? `?${query}` : ""}`;
};

export const importFinanceCsv = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post<{ imported: number }>("/api/finance-file/import", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
