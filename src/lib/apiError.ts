/**
 * Ambil pesan error dari body JSON response API secara aman (tanpa asumsi
 * bentuknya), jatuh ke pesan default kalau tidak ada/format tidak sesuai.
 */
export function extractErrorMessage(data: unknown, fallback: string): string {
  if (data && typeof data === "object" && "message" in data && typeof data.message === "string") {
    return data.message;
  }

  return fallback;
}
