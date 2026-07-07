"use client";

import Link from "next/link";
import { Download, Eye, FileText, ReceiptText, Search } from "lucide-react";

const invoices = [
  { id: "INV-FM-3041", order: "FM-3041", date: "19 Jun 2026", total: "Rs. 430", tax: "Rs. 20", status: "Ready" },
  { id: "INV-FM-3038", order: "FM-3038", date: "14 Jun 2026", total: "Rs. 820", tax: "Rs. 39", status: "Ready" },
  { id: "INV-FM-2908", order: "FM-2908", date: "03 Jun 2026", total: "Rs. 145", tax: "Rs. 7", status: "Ready" }
];

export default function CustomerInvoicesPage() {
  return (
    <div className="mx-auto max-w-[104rem] px-4 py-10 pb-28 sm:px-6 lg:px-8 xl:px-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">Account</p>
          <h1 className="mt-1 text-4xl font-black">Invoices</h1>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-500">
            Download billing records for confirmed and delivered FirstMED orders.
          </p>
        </div>
        <Link href="/account/orders" className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-black text-white shadow-glow">
          <ReceiptText size={16} /> View orders
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="soft-card overflow-hidden rounded-[2rem]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sky-100 bg-sky-50/60 px-5 py-4">
            <h2 className="text-xl font-black">Billing history</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-blue" size={14} />
              <input placeholder="Search invoice" className="w-56 rounded-full border border-sky-100 bg-white py-2 pl-9 pr-3 text-xs font-bold outline-brand-blue" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-sky-50 text-left">
                  {["Invoice", "Order", "Date", "Tax", "Total", "Status", "Actions"].map((heading) => (
                    <th key={heading} className="px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-400">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-sky-50 last:border-0 hover:bg-sky-50/40">
                    <td className="px-5 py-4 font-black text-brand-blue">{invoice.id}</td>
                    <td className="px-5 py-4 font-bold text-slate-700">{invoice.order}</td>
                    <td className="px-5 py-4 text-xs font-semibold text-slate-500">{invoice.date}</td>
                    <td className="px-5 py-4 font-bold text-slate-600">{invoice.tax}</td>
                    <td className="px-5 py-4 font-black text-slate-900">{invoice.total}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">{invoice.status}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button className="grid h-8 w-8 place-items-center rounded-xl bg-sky-50 text-brand-blue hover:bg-sky-100">
                          <Eye size={14} />
                        </button>
                        <button className="grid h-8 w-8 place-items-center rounded-xl bg-brand-blue text-white">
                          <Download size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="grid gap-5">
          <div className="soft-card rounded-[2rem] p-5">
            <FileText size={22} className="text-brand-blue" />
            <h2 className="mt-3 text-lg font-black">Invoice rules</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
              Invoices become available after order confirmation and include item totals, taxes, discounts, and payment status.
            </p>
          </div>
          <div className="rounded-[2rem] border border-amber-100 bg-amber-50 p-5">
            <p className="text-sm font-black text-amber-800">GST billing profiles can be added later when backend billing profiles are available.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
