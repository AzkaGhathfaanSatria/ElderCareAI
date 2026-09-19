// Skeleton bersama untuk /access dan /notifications — kerangka layout
// (TopNav + tab + list) identik di kedua halaman ini.
export function TabbedPageSkeleton() {
  return (
    <div className="min-h-screen bg-paper">
      {/* TopNav skeleton */}
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

      {/* Content skeleton */}
      <div className="animate-pulse p-4 sm:p-6 lg:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="h-6 w-64 rounded bg-border" />
            <div className="h-3 w-80 rounded bg-border" />
          </div>
          <div className="h-9 w-44 rounded-full bg-border" />
        </div>

        <div className="mb-5 flex gap-4 border-b border-border pb-3">
          <div className="h-4 w-16 rounded bg-border" />
          <div className="h-4 w-24 rounded bg-border" />
        </div>

        <div className="space-y-5 rounded-2xl bg-surface p-6">
          <div className="h-16 rounded bg-border" />
          <div className="h-16 rounded bg-border" />
          <div className="h-16 rounded bg-border" />
        </div>
      </div>

      <footer className="border-t border-border bg-surface px-4 py-5 text-center sm:px-6 lg:px-8">
        <div className="mx-auto h-3 w-64 animate-pulse rounded bg-border" />
      </footer>
    </div>
  );
}
