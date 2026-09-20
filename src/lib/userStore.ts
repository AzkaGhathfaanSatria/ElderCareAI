import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { UserRole } from "../types/auth";
import { hashPassword } from "./auth-password";
import { getDataDir } from "./dataDir";

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: string;
}

const DATA_DIR = getDataDir();
const USERS_FILE = path.join(DATA_DIR, "users.json");

async function ensureSeeded(): Promise<StoredUser[]> {
  await mkdir(DATA_DIR, { recursive: true });

  try {
    const raw = await readFile(USERS_FILE, "utf-8");
    return JSON.parse(raw) as StoredUser[];
  } catch {
    // Belum ada file users.json — buat dengan 2 akun demo (password sudah di-hash bcrypt).
    const seeded: StoredUser[] = [
      {
        id: "user-keluarga-1",
        name: "Dian Kusuma",
        email: "dian@eldercare.ai",
        passwordHash: await hashPassword("keluarga123"),
        role: "keluarga",
        createdAt: new Date().toISOString(),
      },
      {
        id: "user-medis-1",
        name: "dr. Amelia Putri",
        email: "amelia@eldercare.ai",
        passwordHash: await hashPassword("medis123"),
        role: "tenaga_medis",
        createdAt: new Date().toISOString(),
      },
      {
        id: "user-admin-1",
        name: "Bagas Prasetyo",
        email: "admin@eldercare.ai",
        passwordHash: await hashPassword("admin123"),
        role: "admin",
        createdAt: new Date().toISOString(),
      },
    ];

    await writeFile(USERS_FILE, JSON.stringify(seeded, null, 2), "utf-8");
    return seeded;
  }
}

export async function getAllUsers(): Promise<StoredUser[]> {
  return ensureSeeded();
}

export async function findUserByEmail(email: string): Promise<StoredUser | null> {
  const users = await ensureSeeded();
  const normalized = email.trim().toLowerCase();
  return users.find((user) => user.email.toLowerCase() === normalized) ?? null;
}

export async function createUser(input: {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}): Promise<StoredUser> {
  const users = await ensureSeeded();

  const newUser: StoredUser = {
    id: `user-${Date.now()}`,
    name: input.name,
    email: input.email,
    passwordHash: input.passwordHash,
    role: input.role,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  await writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");

  return newUser;
}
