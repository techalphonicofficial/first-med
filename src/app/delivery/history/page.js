"use client";

import { CheckCircle2, Clock, MapPin, Truck } from "lucide-react";

const mockHistory = [
  { id: "FM-3041", date: "Today, 10:30 AM", pickup: "Sector 21", drop: "Block C", earnings: "Rs. 45", status: "Delivered" },
  { id: "FM-3039", date: "Today, 09:15 AM", pickup: "Metro Height", drop: "Block A", earnings: "Rs. 60", status: "Delivered" },
  { id: "FM-3031", date: "Yesterday, 06:45 PM", pickup: "Sector 21", drop: "Green Park", earnings: "Rs. 55", status: "Delivered" },
  { id: "FM-3028", date: "Yesterday, 05:20 PM", pickup: "Express Hub", drop: "Tower 2", earnings: "Rs. 35", status: "Returned" },
];

export default function DeliveryHistoryPage() {
  return (
    <div className="mx-auto max-w-[104rem] px-4 py-8 pb-28 sm:px-6 lg:px-8 xl:px-10">
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-widest text-emerald-600">Fast delivery partner</p>
        <h1 className="mt-1 text-4xl font-black">Delivery History</h1>
      </div>

      <div className="soft-card overflow-hidden rounded-2xl bg-white shadow-premium">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-emerald-50 bg-slate-50 text-left">
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Order ID & Date</th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Route</th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Earnings</th>
              </tr>
            </thead>
            <tbody>
              {mockHistory.map((item) => (
                <tr key={item.id} className="border-b border-emerald-50 last:border-0 hover:bg-emerald-50/40 transition">
                  <td className="px-5 py-4">
                    <p className="font-black text-emerald-600">{item.id}</p>
                    <p className="text-xs font-semibold text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock size={12} /> {item.date}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-700">{item.pickup}</span>
                      <Truck size={12} className="text-slate-400" />
                      <span className="font-bold text-slate-700">{item.drop}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-black ${
                      item.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {item.status === 'Delivered' && <CheckCircle2 size={12} />}
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <p className="font-black text-slate-900">{item.earnings}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
