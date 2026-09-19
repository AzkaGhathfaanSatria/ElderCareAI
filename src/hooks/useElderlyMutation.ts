"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ElderlyRegistrationInput } from "../schemas/elderlyRegistrationSchema";
import type { Elderly } from "../types/elderCare";

interface CreateElderlyResult {
  elderly: Elderly;
  registration: ElderlyRegistrationInput;
}

async function createElderly(input: ElderlyRegistrationInput): Promise<CreateElderlyResult> {
  const response = await fetch("/api/elderly", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const body: unknown = await response.json().catch(() => null);
    const message =
      body && typeof body === "object" && "message" in body && typeof body.message === "string"
        ? body.message
        : "Gagal menyimpan data lansia.";

    throw new Error(message);
  }

  return (await response.json()) as CreateElderlyResult;
}

export function useElderlyMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createElderly,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["elder-care"],
      });
    },
  });
}
