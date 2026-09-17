export default function DashboardLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper">
      <div className="flex items-center gap-3 text-ink-soft">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-accent" />
        <p className="text-sm font-medium">Memuat dashboard...</p>
      </div>
    </div>
  );
}
