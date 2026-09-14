export default function ElderlyLoading() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        {/* Sidebar Skeleton */}
        <aside className="hidden h-screen w-64 shrink-0 animate-pulse bg-slate-900 lg:flex lg:flex-col">
          {/* Logo */}
          <div className="border-b border-slate-800 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-slate-700" />

              <div className="space-y-2">
                <div className="h-3 w-24 rounded bg-slate-700" />
                <div className="h-2 w-28 rounded bg-slate-800" />
              </div>
            </div>
          </div>

          {/* Menu */}
          <div className="space-y-3 p-4">
            <div className="h-4 w-20 rounded bg-slate-800" />

            <div className="h-11 rounded-xl bg-slate-800" />
            <div className="h-11 rounded-xl bg-slate-800" />
            <div className="h-11 rounded-xl bg-slate-800" />
            <div className="h-11 rounded-xl bg-slate-800" />
          </div>

          {/* Admin */}
          <div className="mt-auto border-t border-slate-800 p-4">
            <div className="flex items-center gap-3 rounded-xl bg-slate-800 p-3">
              <div className="h-8 w-8 rounded-full bg-slate-700" />

              <div className="space-y-2">
                <div className="h-3 w-24 rounded bg-slate-700" />
                <div className="h-2 w-28 rounded bg-slate-700" />
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1">
          {/* Header Skeleton */}
          <header className="flex min-h-16 animate-pulse items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-3 sm:px-6 lg:px-8">
            <div className="space-y-2">
              <div className="h-3 w-20 rounded bg-slate-200" />
              <div className="h-5 w-44 rounded bg-slate-200" />
            </div>

            <div className="flex items-center gap-3">
              <div className="h-9 w-36 rounded-xl bg-slate-200" />

              <div className="hidden space-y-2 sm:block">
                <div className="ml-auto h-3 w-24 rounded bg-slate-200" />
                <div className="ml-auto h-2 w-32 rounded bg-slate-200" />
              </div>

              <div className="h-9 w-9 rounded-full bg-slate-200" />
            </div>
          </header>

          {/* Content */}
          <div className="animate-pulse p-4 sm:p-6 lg:p-8">
            {/* Back Button */}
            <div className="mb-6">
              <div className="h-9 w-40 rounded-xl bg-slate-200" />
            </div>

            {/* Elderly Profile */}
            <section className="mb-6 rounded-xl bg-white p-5 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-slate-200" />

                <div className="space-y-3">
                  <div className="h-5 w-48 rounded bg-slate-200" />
                  <div className="h-3 w-32 rounded bg-slate-200" />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="h-20 rounded-xl bg-slate-200" />
                <div className="h-20 rounded-xl bg-slate-200" />
                <div className="h-20 rounded-xl bg-slate-200" />
              </div>
            </section>

            {/* Health Overview */}
            <section className="mb-6">
              <div className="mb-4 h-5 w-40 rounded bg-slate-200" />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                <div className="h-32 rounded-xl bg-white" />
                <div className="h-32 rounded-xl bg-white" />
                <div className="h-32 rounded-xl bg-white" />
              </div>
            </section>

            {/* Behavior + Device */}
            <section className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
              {/* Behavior Baseline */}
              <div className="rounded-xl bg-white p-5 sm:p-6">
                <div className="h-5 w-44 rounded bg-slate-200" />

                <div className="mt-5 space-y-4">
                  <div className="h-14 rounded-lg bg-slate-200" />
                  <div className="h-14 rounded-lg bg-slate-200" />
                  <div className="h-14 rounded-lg bg-slate-200" />
                </div>
              </div>

              {/* Device Status */}
              <div className="rounded-xl bg-white p-5 sm:p-6">
                <div className="h-5 w-36 rounded bg-slate-200" />

                <div className="mt-5 space-y-4">
                  <div className="h-16 rounded-lg bg-slate-200" />
                  <div className="h-16 rounded-lg bg-slate-200" />
                </div>
              </div>
            </section>

            {/* Anomaly History */}
            <section className="mb-6 rounded-xl bg-white p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <div className="h-5 w-40 rounded bg-slate-200" />
                  <div className="h-3 w-64 rounded bg-slate-200" />
                </div>

                <div className="h-9 w-32 rounded-lg bg-slate-200" />
              </div>

              <div className="mt-6 space-y-3">
                <div className="h-16 rounded-lg bg-slate-200" />
                <div className="h-16 rounded-lg bg-slate-200" />
                <div className="h-16 rounded-lg bg-slate-200" />
              </div>
            </section>

            {/* Current Alert */}
            <section className="rounded-xl bg-white p-5 sm:p-6">
              <div className="h-5 w-36 rounded bg-slate-200" />

              <div className="mt-5 h-24 rounded-xl bg-slate-200" />
            </section>
          </div>

          {/* Footer */}
          <footer className="border-t border-slate-200 bg-white px-4 py-5 text-center sm:px-6 lg:px-8">
            <div className="mx-auto h-3 w-64 animate-pulse rounded bg-slate-200" />
          </footer>
        </main>
      </div>
    </div>
  );
}