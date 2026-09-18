import { z } from "zod";

export const AccessGrantSchema = z.object({
  name: z.string().trim().min(1, "Nama tenaga medis wajib diisi."),

  email: z.string().trim().min(1, "Email wajib diisi.").email("Format email tidak valid."),

  specialization: z.string().trim().min(1, "Spesialisasi/peran wajib diisi."),
});

export type AccessGrantInput = z.infer<typeof AccessGrantSchema>;
