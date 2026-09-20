import type { UserRole } from "../types/auth";

export const roleLabel: Record<UserRole, string> = {
  keluarga: "Keluarga/Caregiver",
  tenaga_medis: "Tenaga Medis",
  admin: "Administrator Sistem",
};
