export default function AdminSectionLoading() {
  return (
    <div className="min-h-screen bg-paper">
      <div className="animate-pulse bg-surface">
        <div className="flex h-16 items-center justify-between border-b border-border/60 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-border" />
            <div className="space-y-2">
              <div className="h-3 w-24 rounded bg-border" />
              <div className="h-2 w-20 rounded bg-border" />
            </div>
          </div>
          <div className="h-9 w-9 rounded-full bg-border" />
        </div>
        <div className="flex items-center gap-4 border-b border-border px-4 py-3 sm:px-6 lg:px-8">
          <div className="h-4 w-24 rounded bg-border" />
          <div className="h-4 w-32 rounded bg-border" />
          <div className="h-4 w-32 rounded bg-border" />
        </div>
      </div>

      <div className="animate-pulse p-4 sm:p-6 lg:p-8">
        <div className="mb-6 space-y-2">
          <div className="h-6 w-64 rounded bg-border" />
          <div className="h-3 w-80 rounded bg-border" />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border sm:grid-cols-2 xl:grid-cols-4">
          <div className="h-28 bg-surface" />
          <div className="h-28 bg-surface" />
          <div className="h-28 bg-surface" />
          <div className="h-28 bg-surface" />
        </div>

        <div className="space-y-5 rounded-2xl bg-surface p-6">
          <div className="h-14 rounded bg-border" />
          <div className="h-14 rounded bg-border" />
          <div className="h-14 rounded bg-border" />
        </div>
      </div>
    </div>
  );
}
