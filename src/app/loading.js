export default function Loading() {
  return (
    <div className="mx-auto max-w-[104rem] px-4 py-10 sm:px-6 lg:px-8 xl:px-10">
      {/* Header skeleton */}
      <div className="mb-8 flex flex-col gap-4">
        <div className="h-4 w-24 animate-pulse rounded-full bg-slate-200" />
        <div className="h-10 w-64 animate-pulse rounded-full bg-slate-200" />
      </div>
      
      {/* Grid skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex flex-col gap-4 rounded-2xl p-4 shadow-sm border border-slate-100">
            <div className="h-48 w-full animate-pulse rounded-xl bg-slate-100" />
            <div className="h-6 w-3/4 animate-pulse rounded-full bg-slate-200" />
            <div className="h-4 w-1/2 animate-pulse rounded-full bg-slate-100" />
            <div className="mt-2 flex gap-2">
              <div className="h-10 flex-1 animate-pulse rounded-xl bg-slate-100" />
              <div className="h-10 flex-1 animate-pulse rounded-xl bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
