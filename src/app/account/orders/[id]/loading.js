export default function OrderDetailLoading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 pb-28 sm:px-6 lg:px-8">
      <div className="mb-6 h-4 w-32 rounded bg-slate-200 animate-pulse" />

      {/* Header skeleton */}
      <div className="mb-8 h-48 w-full rounded-[2.5rem] bg-slate-200 animate-pulse" />

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        {/* Left Column: Items */}
        <div className="grid gap-6">
          <div className="rounded-[2rem] border border-slate-100 p-6 sm:p-8">
            <div className="mb-6 h-6 w-48 rounded bg-slate-200 animate-pulse" />
            <div className="grid gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-20 w-20 rounded-2xl bg-slate-200 animate-pulse" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-4 w-3/4 rounded bg-slate-200 animate-pulse" />
                    <div className="h-3 w-1/4 rounded bg-slate-200 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="grid gap-6 h-fit">
          <div className="h-32 rounded-[2rem] bg-slate-200 animate-pulse" />
          <div className="h-48 rounded-[2rem] bg-slate-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
