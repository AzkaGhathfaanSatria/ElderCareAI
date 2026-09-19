/**
 * Fallback ringan untuk Suspense boundary di level halaman (app/**\/page.tsx).
 * Ditampilkan sesaat saat chunk JS komponen client di bawahnya masih dimuat
 * (code-splitting boundary Next.js App Router), sebelum komponen client
 * (mis. Dashboard, ElderlyDetail) sempat mount dan mengambil alih tampilan
 * loading-nya sendiri lewat QueryStateScreen.
 *
 * Bukan client component -- boleh dirender di server tanpa JS tambahan.
 */
function PageLoadingFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-4">
      <section
        className="rounded-xl bg-surface px-8 py-6 text-center shadow-sm"
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-border border-t-accent" />

        <p className="text-sm font-medium text-ink-soft">Memuat halaman...</p>
      </section>
    </main>
  );
}

export default PageLoadingFallback;
