# ElderCare AI

Sistem berbasis Wearable, IoT, dan AI yang memantau lansia dan mengirim peringatan dini ke
keluarga saat ada tanda risiko kesehatan. Dibangun sebagai Proyek Akhir Praktik Pemrograman
Front-End — D3 Teknik Informatika Kab. Madiun, Sekolah Vokasi, Universitas Sebelas Maret.

## Live Demo

> TODO: isi tautan deployment Vercel/Cloudflare Workers setelah production deploy aktif.

## Tumpukan Teknologi

- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI**: React 19, Tailwind CSS v4, Radix UI, Class Variance Authority (CVA)
- **State**: Zustand (client UI state) + TanStack Query v5 (server/remote state)
- **Validasi**: Zod (schema validation, client & server)
- **Auth**: JWT (jose) untuk sesi, bcryptjs untuk hashing password
- **Tooling**: TypeScript (strict mode), Biome, Oxlint

## Menjalankan Secara Lokal

```bash
npm install
cp .env.example .env.local   # isi AUTH_SECRET dengan string acak yang panjang
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

### Akun Demo

| Role | Email | Password |
|---|---|---|
| Keluarga/Caregiver | dian@eldercare.ai | keluarga123 |
| Tenaga Medis | amelia@eldercare.ai | medis123 |
| Admin | admin@eldercare.ai | admin123 |

## Skrip yang Tersedia

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Menjalankan dev server |
| `npm run build` | Build produksi |
| `npm run start` | Menjalankan hasil build produksi |
| `npm run lint` | Lint dengan Oxlint |
| `npm run biome:check` | Cek format & gaya kode dengan Biome |
| `npm run typecheck` | Cek tipe TypeScript tanpa emit output |

## Struktur Proyek

```
src/
├─ app/            # Next.js App Router (routes, layouts, API routes)
├─ features/        # Komponen halaman utama per fitur (client components)
├─ components/       # Komponen UI reusable (dashboard, elderly, layout, ui)
├─ hooks/           # Custom hooks (TanStack Query, session)
├─ lib/             # Auth (edge-safe & Node-only), penyimpanan user
├─ schemas/         # Skema validasi Zod
├─ services/         # Pemanggilan data/API
├─ store/           # Zustand store (UI state)
└─ types/           # Definisi tipe TypeScript
```

## Kualitas Kode

Proyek ini menargetkan SonarQube Quality Gate (0 Vulnerabilities, 0 Security Hotspots).
Konfigurasi ada di `sonar-project.properties`. Pipeline CI (`.github/workflows/ci.yml`)
menjalankan lint, format check, typecheck, dan build pada setiap push/PR ke `main`.

## Dokumen Terkait

- Spesifikasi Kebutuhan Perangkat Lunak (SKPL/SRS): lihat dokumen laporan proyek akhir.
