export type UserRole = "keluarga" | "tenaga_medis" | "admin";

export interface PublicUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
