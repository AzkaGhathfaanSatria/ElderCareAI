"use client";

import { useQuery } from "@tanstack/react-query";
import { getMe } from "../services/backendApi";

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: getMe,
    staleTime: 60 * 1000,
    retry: false,
  });
}
