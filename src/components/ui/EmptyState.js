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
      <div className="mx-auto mb-6 flex justify-center">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-float">
          <circle cx="60" cy="60" r="50" fill="#E0F2FE" />
          <circle cx="60" cy="60" r="35" fill="#BAE6FD" />
          <path d="M48 60L56 68L72 52" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="95" cy="25" r="8" fill="#FDE047" />
          <circle cx="20" cy="95" r="5" fill="#93C5FD" />
          <circle cx="100" cy="90" r="12" fill="#BAE6FD" opacity="0.5" />
        </svg>
      </div>
      <h2 className="mt-4 text-2xl font-black text-brand-dark dark:text-white">{title}</h2>
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
