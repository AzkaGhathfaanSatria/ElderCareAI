import { ElderCareDataSchema } from "../schemas/elderCareSchema";
import type { ElderCareData } from "../types/elderCare";

export async function fetchElderCareData(): Promise<ElderCareData> {
  const response = await fetch("/data/elderly.json");

  if (!response.ok) {
    throw new Error("Gagal mengambil data monitoring.");
  }

  const rawData: unknown = await response.json();

  const result = ElderCareDataSchema.safeParse(rawData);

  if (!result.success) {
    throw new Error("Format data monitoring tidak valid.");
  }

  return result.data;
}
