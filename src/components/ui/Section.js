import { TextReveal } from "@/components/motion/TextReveal";

export function Section({ eyebrow, title, action, children, className = "" }) {
  return (
    <section className={`mx-auto max-w-[104rem] px-4 py-10 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 ${className}`}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          {eyebrow && <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">{eyebrow}</p>}
          {title && <TextReveal text={title} className="mt-2 max-w-xl text-2xl font-black leading-tight text-slate-900 dark:text-slate-100 sm:text-4xl" />}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
