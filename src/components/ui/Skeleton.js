export function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-2xl bg-sky-100/80 ${className}`} />;
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="shelf">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="soft-card rounded-[1.5rem] p-2">
          <Skeleton className="aspect-[1.05]" />
          <Skeleton className="mt-3 h-4 w-5/6" />
          <Skeleton className="mt-2 h-3 w-2/3" />
          <Skeleton className="mt-4 h-9 w-full" />
        </div>
      ))}
    </div>
  );
}
