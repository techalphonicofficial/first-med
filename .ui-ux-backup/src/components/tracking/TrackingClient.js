"use client";

import { useEffect, useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { createMockTrackingSocket } from "@/services/socket";

export function TrackingClient({ id }) {
  const [track, setTrack] = useState({ progress: 32, eta: "24 min" });
  useEffect(() => {
    const socket = createMockTrackingSocket(setTrack);
    return () => socket.close();
  }, []);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black">Tracking {id}</h1>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="relative min-h-[420px] overflow-hidden rounded-2xl bg-[#dff4ff] shadow-soft">
          <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "linear-gradient(#b9e7f8 1px, transparent 1px), linear-gradient(90deg, #b9e7f8 1px, transparent 1px)", backgroundSize: "42px 42px" }} />
          <div className="absolute left-[18%] top-[22%] h-3 w-3 rounded-full bg-brand-blue" />
          <div className="absolute left-[18%] top-[22%] h-[45%] w-[55%] rounded-br-[120px] border-b-8 border-r-8 border-brand-blue" />
          <div className="absolute" style={{ left: `${20 + track.progress / 2}%`, top: `${58 - track.progress / 5}%` }}>
            <div className="grid h-14 w-14 place-items-center rounded-full bg-brand-yellow text-brand-blue shadow-soft"><Navigation /></div>
          </div>
          <div className="absolute bottom-5 left-5 rounded-2xl bg-white p-4 shadow-card"><MapPin className="mr-2 inline text-brand-blue" /> Live route preview</div>
        </div>
        <aside className="rounded-2xl bg-white p-6 shadow-card">
          <p className="text-sm font-black text-brand-blue">ETA</p>
          <h2 className="mt-1 text-5xl font-black">{track.eta}</h2>
          <div className="mt-8 h-3 rounded-full bg-sky-100"><div className="h-3 rounded-full bg-brand-blue" style={{ width: `${track.progress}%` }} /></div>
          <div className="mt-8 grid gap-3 text-sm font-bold text-slate-600">
            {["Assigned", "Picked up", "Out for delivery", "Delivered"].map((step) => <div key={step} className="rounded-xl bg-sky-50 p-3">{step}</div>)}
          </div>
        </aside>
      </div>
    </div>
  );
}
