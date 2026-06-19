import { ArrowRight, SearchX } from "lucide-react";
import { Button } from "./Button";

export function EmptyState({
  title = "Nothing here yet",
  text = "Try changing your filters or come back later.",
  actionLabel,
  actionHref,
  secondaryLabel,
  secondaryHref,
  tips = []
}) {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-brand-blue/20 bg-white/88 p-8 text-center shadow-card">
      <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-brand-softBlue text-brand-blue">
        <SearchX size={24} />
      </div>
      <h2 className="mt-4 text-2xl font-black text-brand-dark">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-brand-gray">{text}</p>
      {tips.length ? (
        <div className="mx-auto mt-5 grid max-w-xl gap-2 sm:grid-cols-3">
          {tips.map((tip) => (
            <span key={tip} className="rounded-2xl bg-sky-50 px-3 py-2 text-xs font-black text-brand-blue">
              {tip}
            </span>
          ))}
        </div>
      ) : null}
      {(actionLabel && actionHref) || (secondaryLabel && secondaryHref) ? (
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {actionLabel && actionHref ? <Button href={actionHref}>{actionLabel} <ArrowRight size={16} /></Button> : null}
          {secondaryLabel && secondaryHref ? <Button href={secondaryHref} className="bg-sky-50 text-brand-blue hover:bg-sky-100">{secondaryLabel}</Button> : null}
        </div>
      ) : null}
    </div>
  );
}
