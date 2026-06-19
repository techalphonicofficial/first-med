import { SearchX } from "lucide-react";
import { Button } from "./Button";

export function EmptyState({ title = "Nothing here yet", text = "Try changing your filters or come back later.", actionLabel, actionHref }) {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-brand-blue/20 bg-white/80 p-8 text-center shadow-card">
      <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-brand-softBlue text-brand-blue">
        <SearchX size={24} />
      </div>
      <h2 className="mt-4 text-2xl font-black text-brand-dark">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-brand-gray">{text}</p>
      {actionLabel && actionHref ? <Button href={actionHref} className="mt-5">{actionLabel}</Button> : null}
    </div>
  );
}
