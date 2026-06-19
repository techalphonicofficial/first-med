export function StaticPage({ title, text }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-white p-8 shadow-card">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">FirstMED</p>
        <h1 className="mt-2 text-4xl font-black">{title}</h1>
        <p className="mt-5 leading-7 text-slate-600">{text}</p>
      </div>
    </div>
  );
}
