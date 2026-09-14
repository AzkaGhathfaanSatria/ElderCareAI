"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Elderly } from "../types/elderCare";
import type { ElderlyRegistrationInput } from "../schemas/elderlyRegistrationSchema";

interface CreateElderlyResult {
  elderly: Elderly;
  registration: ElderlyRegistrationInput;
}

async function createElderly(
  input: ElderlyRegistrationInput
): Promise<CreateElderlyResult> {
  await new Promise<void>((resolve) => {
    window.setTimeout(resolve, 1200);
  });

  const response = await fetch("/data/elderly.json");

  if (!response.ok) {
    throw new Error("Gagal mengambil data lansia.");
  }

  const rawData: unknown = await response.json();

  if (
    typeof rawData !== "object" ||
    rawData === null ||
    !("elderly" in rawData)
  ) {
    throw new Error("Format data lansia tidak valid.");
  }

  const currentData = rawData as {
    elderly: Elderly;
  };

  const createdElderly: Elderly = {
    ...currentData.elderly,
    name: input.name,
  };

  return {
    elderly: createdElderly,
    registration: input,
  };
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