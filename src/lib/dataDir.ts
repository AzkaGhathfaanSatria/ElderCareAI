import path from "node:path";

/**
 * Di Vercel (dan platform serverless sejenis), folder hasil deploy itu
 * read-only — cuma /tmp yang boleh ditulis. Jadi kalau terdeteksi jalan
 * di Vercel, data ditulis ke /tmp. Di lokal (npm run dev / npm start),
 * tetap pakai folder ./data seperti biasa supaya datanya nggak hilang
 * tiap restart server.
 *
 * PENTING buat dipahami: /tmp di Vercel itu SEMENTARA — bisa kereset
 * kapan saja (cold start baru, deploy baru, pindah instance serverless).
 * Ini cukup buat demo/prototype, TAPI bukan pengganti database asli.
 * Kalau butuh data yang beneran permanen di production, ganti ke
 * database terkelola (mis. Vercel Postgres, Supabase, dll).
 */
export function getDataDir(): string {
  if (process.env.VERCEL) {
    return "/tmp/eldercare-data";
  }

  return path.join(process.cwd(), "data");
}
