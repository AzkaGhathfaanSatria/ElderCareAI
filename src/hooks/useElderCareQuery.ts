"use client";

import { useQuery } from "@tanstack/react-query";

import { ElderCareDataSchema } from "../schemas/elderCareSchema";
import type { ElderCareData } from "../types/elderCare";

async function fetchElderCareData(): Promise<ElderCareData> {
  const response = await fetch("/data/elderly.json");

  if (!response.ok) {
    throw new Error("Gagal mengambil data ElderCare.");
  }

  const rawData: unknown = await response.json();

  const result = ElderCareDataSchema.safeParse(rawData);

  if (!result.success) {
    throw new Error("Format data ElderCare tidak valid.");
  }

  return result.data;
}

export function useElderCareQuery() {
  return useQuery({
    queryKey: ["elder-care"],
    queryFn: fetchElderCareData,
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
