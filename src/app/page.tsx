import Link from "next/link";

const features = [
  {
    number: "01",
    title: "Monitoring terpusat",
    description:
      "Pantau ringkasan kondisi lansia, tanda vital, aktivitas, dan status perangkat dari satu dashboard.",
  },
  {
    number: "02",
    title: "Deteksi jatuh berbasis AI",
    description:
      "Data wearable dan computer vision diproses untuk membantu mengenali risiko dan kejadian jatuh lebih dini.",
  },
  {
    number: "03",
    title: "Alert & notifikasi",
    description:
      "Alert diproses dengan aturan severity, cooldown, dan deduplikasi sebelum diteruskan kepada penerima yang berwenang.",
  },
  {
    number: "04",
    title: "Akses sesuai peran",
    description:
      "Keluarga, tenaga medis, dan admin mendapatkan akses sesuai peran serta izin terhadap data lansia.",
  },
];

const steps = [
  ["01", "Hubungkan perangkat", "Wearable dan kamera menjadi sumber data pemantauan."],
  ["02", "Data dianalisis", "Backend memproses data sensor dan hasil computer vision."],
  ["03", "Risiko dinilai", "AI dan alert engine membantu menentukan kondisi yang perlu diperhatikan."],
  ["04", "Keluarga mendapat kabar", "Notifikasi dan dashboard menyajikan informasi yang relevan."],
];

function Mark({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-xl bg-ink font-serif text-lg text-paper ${className}`}
      aria-hidden="true"
    >
      E
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-paper text-ink">
      <div
        className="h-1.5 bg-[repeating-linear-gradient(90deg,var(--color-accent)_0,var(--color-accent)_10px,transparent_10px,transparent_20px)] opacity-70"
        aria-hidden="true"
      />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="ElderCare AI beranda">
          <Mark />
          <div>
            <p className="font-serif text-lg leading-none">ElderCare AI</p>
            <p className="mt-1 text-[10px] tracking-[0.13em] text-muted uppercase">Elder monitoring system</p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-ink-soft md:flex">
          <a href="#tentang" className="transition hover:text-accent-dark">Tentang</a>
          <a href="#fitur" className="transition hover:text-accent-dark">Fitur</a>
          <a href="#alur" className="transition hover:text-accent-dark">Cara kerja</a>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/login"
            className="rounded-full px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-surface"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-dark"
          >
            Daftar
          </Link>
        </div>
      </nav>

      <section id="tentang" className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-12 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:px-10 lg:pb-28 lg:pt-20">
        <div className="flex flex-col justify-center">
          <div className="mb-6 flex items-center gap-3 text-sm font-medium text-accent-dark">
            <span className="h-px w-10 bg-accent" />
            Pemantauan lansia berbasis AI
          </div>
          <h1 className="max-w-3xl font-serif text-5xl leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[5.2rem]">
            Tetap dekat,
            <br />
            <span className="text-accent-dark">meski tidak selalu di samping.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-muted sm:text-lg">
            ElderCare AI membantu keluarga dan tenaga medis memantau kondisi lansia melalui wearable, kamera, dan analisis AI dalam satu sistem yang terintegrasi.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/register"
              className="rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition hover:bg-ink-soft"
            >
              Mulai menggunakan ElderCare AI
            </Link>
            <a
              href="#fitur"
              className="rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-accent hover:bg-paper"
            >
              Lihat fitur
            </a>
          </div>
          <p className="mt-5 text-xs leading-5 text-muted">
            Dibangun untuk mendukung pemantauan dini, bukan menggantikan diagnosis atau keputusan medis.
          </p>
        </div>

        <div className="relative flex min-h-[430px] items-center justify-center lg:min-h-[540px]">
          <div className="absolute right-4 top-2 h-64 w-64 rounded-full border border-accent/20 sm:right-12 sm:h-80 sm:w-80" />
          <div className="absolute bottom-3 left-5 h-36 w-36 rounded-full border border-border sm:left-10" />

          <div className="relative w-full max-w-md rounded-[2rem] border border-border bg-surface p-5 shadow-[var(--shadow-card-lg)] sm:p-6">
            <div className="flex items-center justify-between border-b border-border pb-5">
              <div>
                <p className="text-xs font-semibold tracking-[0.12em] text-muted uppercase">Monitoring hari ini</p>
                <p className="mt-1 font-serif text-2xl">Kondisi lansia</p>
              </div>
              <span className="flex items-center gap-2 rounded-full bg-safe/10 px-3 py-1.5 text-xs font-semibold text-safe">
                <span className="h-2 w-2 rounded-full bg-safe" /> Terpantau
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-border bg-paper p-4">
                <p className="text-xs text-muted">Detak jantung</p>
                <p className="mt-2 font-serif text-3xl">78 <span className="text-sm font-sans text-muted">bpm</span></p>
                <div className="mt-3 h-8 overflow-hidden rounded-lg bg-accent/5">
                  <svg viewBox="0 0 180 40" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M0 22h24l8-13 8 23 10-17 9 7h22l9-4 8 10 10-21 9 19 12-5h51" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent" />
                  </svg>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-paper p-4">
                <p className="text-xs text-muted">Aktivitas</p>
                <p className="mt-2 font-serif text-3xl">Normal</p>
                <p className="mt-3 text-xs leading-5 text-safe">Sesuai pola baseline</p>
              </div>
            </div>

            <div className="mt-3 rounded-2xl border border-border bg-paper p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted">Status deteksi</p>
                  <p className="mt-1 text-sm font-semibold">Tidak ada kejadian jatuh</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-safe/10 text-safe" aria-hidden="true">
                  ✓
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-muted">
              <span>Wearable terhubung</span>
              <span className="font-semibold text-ink-soft">Terakhir diperbarui 10:42</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-px bg-border sm:grid-cols-3">
          <div className="bg-surface px-6 py-7 text-center sm:text-left">
            <p className="font-serif text-3xl">Wearable</p>
            <p className="mt-1 text-sm text-muted">Sumber data kesehatan</p>
          </div>
          <div className="bg-surface px-6 py-7 text-center sm:text-left">
            <p className="font-serif text-3xl">Computer Vision</p>
            <p className="mt-1 text-sm text-muted">Deteksi jatuh visual</p>
          </div>
          <div className="bg-surface px-6 py-7 text-center sm:text-left">
            <p className="font-serif text-3xl">Realtime</p>
            <p className="mt-1 text-sm text-muted">Alert & monitoring</p>
          </div>
        </div>
      </section>

      <section id="fitur" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="text-sm font-semibold text-accent-dark">Fitur utama</p>
            <h2 className="mt-3 max-w-md font-serif text-4xl leading-tight sm:text-5xl">
              Informasi penting, tanpa membuat semuanya terasa rumit.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-muted">
              Sistem dirancang mengikuti alur backend ElderCare AI: data perangkat masuk, dianalisis, menghasilkan alert, lalu ditampilkan kepada pihak yang memiliki akses.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {features.map((feature) => (
              <article key={feature.number} className="rounded-2xl border border-border bg-surface p-6 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]">
                <span className="font-mono text-xs font-semibold text-accent-dark">{feature.number}</span>
                <h3 className="mt-8 font-serif text-2xl">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="alur" className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-accent">Cara kerja</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Dari data menjadi tindakan yang lebih cepat.</h2>
          </div>

          <div className="mt-12 grid gap-3 md:grid-cols-4">
            {steps.map(([number, title, description]) => (
              <div key={number} className="border-t border-paper/15 pt-5">
                <span className="font-mono text-xs text-accent">{number}</span>
                <h3 className="mt-6 font-serif text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-paper/60">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface px-6 py-12 text-center sm:px-10">
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full border border-accent/15" aria-hidden="true" />
          <p className="text-sm font-semibold text-accent-dark">Siap memulai?</p>
          <h2 className="mx-auto mt-3 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
            Mulai membangun pemantauan yang lebih tenang untuk keluarga.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted">
            Buat akun dan lanjutkan ke dashboard ElderCare AI untuk mengelola lansia, perangkat, alert, dan akses pemantauan.
          </p>
          <Link
            href="/register"
            className="mt-8 inline-flex rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-accent-dark"
          >
            Buat akun ElderCare AI
          </Link>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-xs text-muted sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div className="flex items-center gap-3">
            <Mark className="h-8 w-8 rounded-lg text-sm" />
            <span>ElderCare AI © 2026</span>
          </div>
          <p>Sistem deteksi jatuh lansia multimodal berbasis wearable dan computer vision.</p>
        </div>
      </footer>
    </main>
  );
}
