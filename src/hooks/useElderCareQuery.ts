"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchElderCareData } from "../services/elderCareApi";

export function useElderCareQuery() {
  return useQuery({
    queryKey: ["elder-care"],
    queryFn: fetchElderCareData,
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
