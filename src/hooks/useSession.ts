"use client";

import { useQuery } from "@tanstack/react-query";

import type { PublicUser } from "../types/auth";

async function fetchSession(): Promise<PublicUser | null> {
  const response = await fetch("/api/auth/me");

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as PublicUser;
}

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: fetchSession,
    staleTime: 60 * 1000,
    retry: false,
  });
}
