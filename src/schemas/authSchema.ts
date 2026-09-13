import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email wajib diisi.")
    .email("Format email tidak valid."),

  password: z
    .string()
    .min(1, "Password wajib diisi.")
    .min(6, "Password minimal 6 karakter."),
});

export type LoginInput = z.infer<typeof LoginSchema>;