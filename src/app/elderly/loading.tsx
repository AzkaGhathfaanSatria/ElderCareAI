export default function ElderlyLoading() {
  return (
    <div className="min-h-screen bg-paper">
      {/* TopNav Skeleton */}
      <div className="animate-pulse bg-surface">
        <div className="flex h-16 items-center justify-between border-b border-border/60 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-border" />

            <div className="space-y-2">
              <div className="h-3 w-24 rounded bg-border" />
              <div className="h-2 w-20 rounded bg-border" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden space-y-2 sm:block">
              <div className="ml-auto h-3 w-24 rounded bg-border" />
              <div className="ml-auto h-2 w-32 rounded bg-border" />
            </div>

            <div className="h-9 w-9 rounded-full bg-border" />
          </div>
        </div>

        <div className="flex items-center gap-4 border-b border-border px-4 py-3 sm:px-6 lg:px-8">
          <div className="h-4 w-20 rounded bg-border" />
          <div className="h-4 w-20 rounded bg-border" />
          <div className="h-4 w-20 rounded bg-border" />
          <div className="h-4 w-16 rounded bg-border" />
        </div>
      </div>

      {/* Page Header Skeleton */}
      <header className="flex min-h-16 animate-pulse items-center justify-between gap-4 border-b border-border bg-surface px-4 py-3 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <div className="h-3 w-20 rounded bg-border" />
          <div className="h-5 w-44 rounded bg-border" />
        </div>

        <div className="h-9 w-36 rounded-xl bg-border" />
      </header>

      {/* Content */}
      <div className="animate-pulse p-4 sm:p-6 lg:p-8">
        {/* Back Button */}
        <div className="mb-6">
          <div className="h-9 w-40 rounded-xl bg-border" />
        </div>

        {/* Elderly Profile banner */}
        <div className="mb-8 flex items-start gap-5 border-b border-border pb-8">
          <div className="h-20 w-20 rounded-full bg-border" />

          <div className="space-y-3">
            <div className="h-6 w-56 rounded bg-border" />
            <div className="h-3 w-40 rounded bg-border" />
            <div className="h-3 w-64 rounded bg-border" />
          </div>
        </div>

        {/* Alert strip */}
        <div className="mb-6 h-16 rounded-lg bg-surface" />

        {/* Vitals strip */}
        <div className="mb-6 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border sm:grid-cols-2 xl:grid-cols-4">
          <div className="h-28 bg-surface" />
          <div className="h-28 bg-surface" />
          <div className="h-28 bg-surface" />
          <div className="h-28 bg-surface" />
        </div>

        {/* Behavior + Device */}
        <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="rounded-2xl bg-surface p-5 sm:p-6">
            <div className="h-5 w-44 rounded bg-border" />

            <div className="mt-5 space-y-4">
              <div className="h-10 rounded bg-border" />
              <div className="h-10 rounded bg-border" />
              <div className="h-10 rounded bg-border" />
            </div>
          </div>

          <div className="rounded-2xl bg-surface p-5 sm:p-6">
            <div className="h-5 w-36 rounded bg-border" />

            <div className="mt-5 space-y-4">
              <div className="h-10 rounded bg-border" />
              <div className="h-10 rounded bg-border" />
            </div>
          </div>
        </div>

        {/* Anomaly History timeline */}
        <div className="mb-6 rounded-2xl bg-surface p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <div className="h-5 w-40 rounded bg-border" />
              <div className="h-3 w-64 rounded bg-border" />
            </div>

            <div className="h-9 w-32 rounded-lg bg-border" />
          </div>

          <div className="mt-6 space-y-5 border-l border-border pl-6">
            <div className="h-14 rounded bg-border" />
            <div className="h-14 rounded bg-border" />
            <div className="h-14 rounded bg-border" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-surface px-4 py-5 text-center sm:px-6 lg:px-8">
        <div className="mx-auto h-3 w-64 animate-pulse rounded bg-border" />
      </footer>
    </div>
  );
}
