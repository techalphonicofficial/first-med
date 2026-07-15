import { Check } from "lucide-react";

export function Stepper({ steps, current = 0 }) {
  return (
    <ol className="grid gap-2 sm:grid-cols-5">
      {steps.map((step, index) => {
        const done = index < current;
        const active = index === current;
        return (
          <li key={step} className={`rounded-2xl border px-3 py-3 text-xs font-black ${done ? "border-emerald-100 bg-emerald-50 text-emerald-700" : active ? "border-brand-blue bg-brand-softBlue text-brand-blue" : "border-sky-100 bg-white text-slate-500 dark:text-white"}`}>
            <span className="mr-2 inline-grid size-5 place-items-center rounded-full bg-white dark:bg-slate-900 dark:border-slate-800">
              {done ? <Check size={13} /> : index + 1}
            </span>
            {step}
          </li>
        );
      })}
    </ol>
  );
}
