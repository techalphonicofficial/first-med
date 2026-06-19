"use client";

import { Search, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";

const faqData = [
  {
    category: "Ordering & Products",
    items: [
      { q: "Can I buy OTC products directly?", a: "Yes. OTC and self-care products can be added to cart and checked out without prescription approval. You can build your entire basket with OTC items." },
      { q: "How do I know if an item is in stock?", a: "Product cards display 'Out of stock' if unavailable. In-stock products show their delivery ETA based on your saved address." },
      { q: "Is there a minimum order value?", a: "No, there is no minimum order value. However, free delivery may apply only above a certain cart total." }
    ]
  },
  {
    category: "Prescriptions & Safety",
    items: [
      { q: "Why is an Rx item blocked?", a: "Prescription-only products require a valid doctor's prescription. You must upload patient details, doctor info, clinic letterhead, registration number, issue date and a file upload before checkout unlocks." },
      { q: "How long does Rx verification take?", a: "During business hours, our partner pharmacists typically verify uploaded prescriptions within 15-30 minutes." },
      { q: "Can I use an old prescription?", a: "Prescriptions must be valid and within their expiry date (usually 3-6 months from the issue date, depending on the medicine type)." }
    ]
  },
  {
    category: "Delivery & Returns",
    items: [
      { q: "How do I track delivery?", a: "After checkout, open the tracking screen from your order confirmation or the Account > Orders page to see live ETA and status." },
      { q: "Can medicines be returned?", a: "Return eligibility depends on product type. Unopened self-care items can be returned within 7 days. Prescription medicines are non-returnable unless damaged, incorrect, or cancelled before dispatch." },
      { q: "What if my delivery is delayed?", a: "If your delivery crosses the estimated ETA, you can use the 'Report Issue' button on the tracking page to alert support instantly." }
    ]
  }
];

export default function FaqPage() {
  const [search, setSearch] = useState("");
  
  // Feedback state mock
  const [feedback, setFeedback] = useState({});

  function handleFeedback(q, type) {
    setFeedback(prev => ({ ...prev, [q]: type }));
  }

  return (
    <div className="mx-auto max-w-[104rem] px-4 py-10 pb-28 sm:px-6 lg:px-8 xl:px-10">
      {/* Header with Search */}
      <div className="rounded-[2.5rem] bg-brand-softBlue px-6 py-16 text-center sm:px-12 md:py-24">
        <h1 className="text-4xl font-black text-brand-dark md:text-5xl">How can we help?</h1>
        <div className="relative mx-auto mt-8 max-w-2xl">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-blue" size={20} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for answers..."
            className="w-full rounded-full border-2 border-white bg-white py-4 pl-14 pr-6 text-base font-bold text-slate-800 shadow-premium outline-brand-blue"
          />
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-4xl">
        {faqData.map((section) => {
          const filteredItems = section.items.filter(item => 
            item.q.toLowerCase().includes(search.toLowerCase()) || 
            item.a.toLowerCase().includes(search.toLowerCase())
          );

          if (filteredItems.length === 0) return null;

          return (
            <div key={section.category} className="mb-12">
              <h2 className="mb-6 text-2xl font-black">{section.category}</h2>
              <div className="grid gap-4">
                {filteredItems.map(({ q, a }) => (
                  <details key={q} className="group soft-card rounded-2xl bg-white p-6 transition-all open:ring-2 open:ring-brand-blue/20">
                    <summary className="flex cursor-pointer items-center justify-between font-black text-slate-800 outline-none group-open:text-brand-blue text-lg">
                      {q}
                      <span className="ml-4 shrink-0 rounded-full bg-sky-50 p-2 text-brand-blue transition group-open:rotate-180">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      </span>
                    </summary>
                    <div className="mt-4 border-t border-sky-50 pt-4">
                      <p className="font-semibold leading-7 text-slate-600">{a}</p>
                      
                      {/* Micro-interaction: Feedback */}
                      <div className="mt-6 flex items-center gap-4 rounded-xl bg-slate-50 p-3 text-sm font-bold text-slate-500">
                        <span>Was this helpful?</span>
                        {feedback[q] ? (
                          <span className="text-brand-blue">Thanks for your feedback!</span>
                        ) : (
                          <div className="flex gap-2">
                            <button onClick={() => handleFeedback(q, 'yes')} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 hover:bg-white hover:text-brand-blue hover:shadow-sm transition"><ThumbsUp size={14} /> Yes</button>
                            <button onClick={() => handleFeedback(q, 'no')} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 hover:bg-white hover:text-rose-600 hover:shadow-sm transition"><ThumbsDown size={14} /> No</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          );
        })}

        {/* Empty state */}
        {search && !faqData.some(s => s.items.some(i => i.q.toLowerCase().includes(search.toLowerCase()) || i.a.toLowerCase().includes(search.toLowerCase()))) && (
          <div className="text-center py-12">
            <p className="text-lg font-black text-slate-400">No results found for "{search}"</p>
            <p className="mt-2 text-sm font-semibold text-slate-500">Try adjusting your search terms or contact support.</p>
          </div>
        )}
      </div>
    </div>
  );
}
