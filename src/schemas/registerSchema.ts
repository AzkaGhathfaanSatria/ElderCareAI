import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Nama lengkap wajib diisi."),

    email: z
      .string()
      .trim()
      .min(1, "Email wajib diisi.")
      .email("Format email tidak valid."),

    password: z
      .string()
      .min(1, "Password wajib diisi.")
      .min(6, "Password minimal 6 karakter."),

    confirmPassword: z
      .string()
      .min(1, "Konfirmasi password wajib diisi."),

    role: z.enum(["keluarga", "tenaga_medis"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak sesuai.",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof RegisterSchema>;