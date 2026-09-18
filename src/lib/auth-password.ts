import bcrypt from "bcryptjs";

/**
 * File ini HANYA boleh diimpor dari route handler / server action yang
 * jalan di Node.js runtime (mis. src/app/api/**). JANGAN pernah diimpor
 * dari proxy.ts / middleware — bcryptjs butuh modul Node (`crypto`) yang
 * tidak tersedia di Edge Runtime dan akan membuat build gagal.
 */

export async function hashPassword(plainPassword: string): Promise<string> {
  return bcrypt.hash(plainPassword, 10);
}

export async function verifyPassword(plainPassword: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hash);
}
