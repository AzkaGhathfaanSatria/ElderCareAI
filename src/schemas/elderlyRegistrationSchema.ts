import { z } from "zod";

export const ElderlyRegistrationSchema = z.object({
  name: z.string().trim().min(1, "Nama lansia wajib diisi."),

  birthDate: z.string().min(1, "Tanggal lahir wajib diisi."),

  address: z.string().trim().min(1, "Alamat wajib diisi."),

  healthNotes: z.string().trim().min(1, "Catatan kesehatan wajib diisi."),

  wearableType: z.string().min(1, "Tipe wearable wajib dipilih."),

  wearableId: z.string().trim().min(1, "ID perangkat wearable wajib diisi."),

  sensorType: z.string().min(1, "Tipe sensor wajib dipilih."),

  sensorLocation: z.string().trim().min(1, "Lokasi sensor wajib diisi."),
});

export type ElderlyRegistrationInput = z.infer<typeof ElderlyRegistrationSchema>;
