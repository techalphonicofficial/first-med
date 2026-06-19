"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Clock, MapPin, Navigation, Phone, ShieldCheck, Truck } from "lucide-react";
import { createMockTrackingSocket } from "@/services/socket";

export function TrackingClient({ id }) {
  const [track, setTrack] = useState({ progress: 10, eta: "24 min" });
  
  useEffect(() => {
    const socket = createMockTrackingSocket(setTrack);
    return () => socket.close();
  }, []);

  const steps = [
    { label: "Assigned", time: "10:42 AM" },
    { label: "Picked up", time: "10:55 AM" },
    { label: "Out for delivery", time: "11:02 AM" },
    { label: "Delivered", time: "Pending" }
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 pb-28 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-black uppercase tracking-widest text-brand-blue">Live Tracking</p>
        <h1 className="mt-1 text-4xl font-black">Order {id}</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Map Area */}
        <div className="soft-card relative min-h-[500px] overflow-hidden rounded-[2rem] bg-[#e6f4f1]">
          <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "linear-gradient(#cdeae3 1px, transparent 1px), linear-gradient(90deg, #cdeae3 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
          
          {/* Fake route line */}
          <div className="absolute left-[20%] top-[20%] h-[50%] w-[60%] rounded-br-[80px] border-b-4 border-r-4 border-dashed border-brand-blue/30" />
          
          {/* Pulse marker origin */}
          <div className="absolute left-[20%] top-[20%] grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-md">
            <div className="h-2 w-2 rounded-full bg-slate-300" />
          </div>
          
          {/* Destination marker */}
          <div className="absolute left-[80%] top-[70%] grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-emerald-500 text-white shadow-md">
            <MapPin size={14} />
          </div>

          {/* Animated Delivery Agent */}
          <div className="absolute transition-all duration-1000 ease-linear" style={{ 
            left: `${20 + (track.progress / 100) * 60}%`, 
            top: track.progress < 50 ? '20%' : `${20 + ((track.progress - 50) / 50) * 50}%` 
          }}>
            <div className="relative -left-1/2 -top-1/2">
              <div className="absolute -inset-2 animate-ping rounded-full bg-brand-blue/30" />
              <div className="relative grid h-12 w-12 place-items-center rounded-full bg-brand-yellow text-brand-blue shadow-premium border-2 border-white">
                <Truck size={20} className={track.progress > 50 ? "" : "-scale-x-100"} />
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 rounded-2xl bg-white p-4 shadow-card">
            <p className="text-sm font-black text-brand-dark">Arriving at</p>
            <p className="mt-1 text-xs font-semibold text-slate-500">Sector 21, Block C</p>
          </div>
        </div>

        {/* Info Sidebar */}
        <aside className="flex flex-col gap-6">
          <div className="soft-card rounded-[2rem] p-8 text-center sm:text-left">
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-2 rounded-full bg-brand-softBlue px-3 py-1.5 text-xs font-black text-brand-blue">
                <Clock size={14} /> Expected Delivery
              </div>
              <h2 className="mt-4 text-5xl font-black text-brand-dark">{track.eta}</h2>
              <p className="mt-2 text-sm font-semibold text-slate-500">Partner is heading to your location.</p>
            </div>
            
            {/* Live Progress Bar */}
            <div className="mt-8 h-3 overflow-hidden rounded-full bg-sky-50 shadow-inner">
              <div className="h-full rounded-full bg-brand-blue transition-all duration-1000" style={{ width: `${track.progress}%` }} />
            </div>
          </div>

          {/* Timeline */}
          <div className="soft-card rounded-[2rem] p-8 flex-1">
            <h3 className="mb-6 text-lg font-black">Order Status</h3>
            <div className="grid gap-0">
              {steps.map((step, index) => {
                const active = track.progress >= index * 28;
                const isLast = index === steps.length - 1;
                return (
                  <div key={step.label} className="relative flex gap-4 pb-6">
                    {!isLast && <div className={`absolute left-[11px] top-6 bottom-0 w-[2px] ${track.progress >= (index + 1) * 28 ? "bg-brand-blue" : "bg-sky-50"}`} />}
                    <div className="relative mt-1">
                      <div className={`grid h-6 w-6 place-items-center rounded-full border-2 border-white ${active ? "bg-brand-blue text-white shadow-soft" : "bg-sky-100 text-transparent"}`}>
                        <ShieldCheck size={12} />
                      </div>
                    </div>
                    <div>
                      <p className={`font-black ${active ? "text-brand-dark" : "text-slate-400"}`}>{step.label}</p>
                      <p className={`text-xs font-bold ${active ? "text-slate-500" : "text-slate-300"}`}>{step.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 rounded-xl bg-brand-blue py-3.5 text-sm font-black text-white shadow-glow hover:bg-[#066CAB] transition">
              <Phone size={16} /> Call Partner
            </button>
            <button className="flex items-center justify-center gap-2 rounded-xl bg-rose-50 py-3.5 text-sm font-black text-rose-600 hover:bg-rose-100 transition">
              <AlertCircle size={16} /> Help
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
