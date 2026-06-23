export default function ProductDetailLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb skeleton */}
      <div className="mb-6 h-4 w-48 rounded bg-slate-200 animate-pulse" />

      {/* Main grid */}
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        
        {/* Left — Gallery skeleton */}
        <div className="flex gap-3">
          <div className="hidden flex-col gap-2 md:flex">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 w-16 rounded-xl bg-slate-200 animate-pulse" />
            ))}
          </div>
          <div className="flex-1">
            <div className="aspect-square rounded-2xl bg-slate-200 animate-pulse" />
            <div className="mt-3 flex gap-2 md:hidden">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 w-14 rounded-xl bg-slate-200 animate-pulse" />
              ))}
            </div>
          </div>
        </div>

        {/* Right — Info skeleton */}
        <section>
          <div className="mb-2 h-4 w-24 rounded bg-slate-200 animate-pulse" />
          <div className="mb-4 h-10 w-3/4 rounded bg-slate-200 animate-pulse" />
          <div className="mb-6 flex gap-3">
            <div className="h-6 w-20 rounded-full bg-slate-200 animate-pulse" />
            <div className="h-6 w-24 rounded-full bg-slate-200 animate-pulse" />
          </div>
          
          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-slate-200 animate-pulse" />
            <div className="h-4 w-5/6 rounded bg-slate-200 animate-pulse" />
            <div className="h-4 w-4/6 rounded bg-slate-200 animate-pulse" />
          </div>

          <div className="mt-8 flex items-end gap-3">
            <div className="h-10 w-32 rounded bg-slate-200 animate-pulse" />
          </div>

          <div className="mt-8 flex gap-3">
            <div className="h-12 w-32 rounded-xl bg-slate-200 animate-pulse" />
            <div className="h-12 w-32 rounded-xl bg-slate-200 animate-pulse" />
          </div>
        </section>
      </div>
    </div>
  );
}
