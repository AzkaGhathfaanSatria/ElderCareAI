export default function TopNavSkeleton() {
  return (
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
  );
}
