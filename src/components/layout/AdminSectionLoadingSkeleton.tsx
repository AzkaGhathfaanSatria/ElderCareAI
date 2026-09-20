import TopNavSkeleton from "./TopNavSkeleton";

export default function AdminSectionLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-paper">
      <TopNavSkeleton />

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
