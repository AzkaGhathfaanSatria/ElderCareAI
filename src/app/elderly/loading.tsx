export default function ElderlyLoading() {
  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl animate-pulse space-y-6">
        {/* Header */}
        <div className="space-y-3">
          <div className="h-8 w-64 rounded-lg bg-slate-200" />
          <div className="h-4 w-96 max-w-full rounded bg-slate-200" />
        </div>

        {/* Profile */}
        <div className="rounded-xl bg-white p-6">
          <div className="h-6 w-48 rounded bg-slate-200" />

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="h-20 rounded-lg bg-slate-200" />
            <div className="h-20 rounded-lg bg-slate-200" />
            <div className="h-20 rounded-lg bg-slate-200" />
          </div>
        </div>

        {/* Health overview */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="h-64 rounded-xl bg-slate-200" />
          <div className="h-64 rounded-xl bg-slate-200" />
        </div>

        {/* Activity / anomaly */}
        <div className="h-72 rounded-xl bg-slate-200" />
      </div>
    </div>
  );
}