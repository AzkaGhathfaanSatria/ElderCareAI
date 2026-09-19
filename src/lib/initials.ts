/**
 * Mengambil inisial dari nama (maks. 2 huruf) untuk avatar bulat.
 * Menghapus gelar umum (dr., Ns.) sebelum mengambil inisial.
 *
 * Contoh: getInitials("dr. Amelia Putri") -> "AP"
 */
export function getInitials(name: string): string {
  return name
    .replace(/^(dr\.|Ns\.)\s*/i, "")
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}
