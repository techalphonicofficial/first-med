import Link from "next/link";
import { ArrowLeft, Box, CheckCircle2, Download, ExternalLink, MapPin, Navigation, Receipt } from "lucide-react";
import Image from "next/image";

export default function OrderDetailPage({ params }) {
  const isSuccess = params.id === "success"; // Magic ID for checkout success
  const displayId = isSuccess ? "FM-3042" : params.id;

  const orderItems = [
    { id: 1, name: "Paracetamol 500mg Tablets", qty: 2, price: 89, total: 178, img: "/product-images/paracetamol-tablets.svg" },
    { id: 2, name: "Vitamin C Zinc Tablets",    qty: 1, price: 199, total: 199, img: "/product-images/vitamin-c-tablets.svg" },
  ];

  const subtotal = orderItems.reduce((acc, item) => acc + item.total, 0);
  const deliveryFee = 40;
  const discount = 37;
  const total = subtotal + deliveryFee - discount;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 pb-28 sm:px-6 lg:px-8">
      {!isSuccess && (
        <Link href="/account/orders" className="mb-6 inline-flex items-center gap-2 text-sm font-black text-brand-blue hover:underline">
          <ArrowLeft size={16} /> Back to Orders
        </Link>
      )}

      {/* Success / Status Header */}
      <div className={`mb-8 overflow-hidden rounded-[2.5rem] border p-8 sm:p-12 text-center shadow-soft relative ${isSuccess ? "bg-emerald-50 border-emerald-100" : "bg-brand-navy border-transparent text-white"}`}>
        
        {isSuccess ? (
          <>
            <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-emerald-500 text-white shadow-glow">
              <CheckCircle2 size={40} />
            </div>
            <h1 className="text-3xl font-black text-emerald-800 md:text-5xl">Order Confirmed!</h1>
            <p className="mt-4 text-lg font-semibold text-emerald-700/80 max-w-lg mx-auto">
              Your prescription has been verified and your order is being packed. Delivery is expected within 90 minutes.
            </p>
          </>
        ) : (
          <>
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand-blue/30 blur-[80px]" />
            <div className="relative z-10">
              <p className="text-xs font-black uppercase tracking-widest text-brand-yellow">Order Details</p>
              <h1 className="mt-2 text-4xl font-black">{displayId}</h1>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-blue/30 px-4 py-1.5 text-sm font-black backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> Preparing for dispatch
              </span>
            </div>
          </>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        {/* Left Column: Items */}
        <div className="grid gap-6">
          <div className="soft-card rounded-[2rem] p-6 sm:p-8">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-black">
              <Box size={20} className="text-brand-blue" /> Items in this order
            </h2>
            
            <div className="grid gap-6">
              {orderItems.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-sky-50 pb-6 last:border-0 last:pb-0">
                  <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-sky-50 p-2">
                    <Image src={item.img} alt={item.name} width={50} height={50} className="object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="font-black text-brand-dark leading-tight">{item.name}</p>
                      <p className="text-sm font-bold text-slate-500">Qty: {item.qty}</p>
                    </div>
                    <p className="font-black">Rs. {item.total}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Summary & Actions */}
        <div className="grid gap-6 h-fit">
          {/* Actions */}
          <div className="soft-card rounded-[2rem] p-6 text-center">
            <Link href={`/track/${displayId}`} className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue py-3.5 text-sm font-black text-white shadow-glow hover:bg-[#066CAB] transition">
              <Navigation size={18} /> Track Delivery
            </Link>
            <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-50 py-3 text-sm font-black text-brand-blue hover:bg-sky-100 transition">
              <Receipt size={16} /> Download Invoice
            </button>
          </div>

          {/* Delivery Details */}
          <div className="soft-card rounded-[2rem] p-6">
            <h3 className="mb-4 text-base font-black flex items-center gap-2">
              <MapPin size={16} className="text-brand-blue" /> Delivery Address
            </h3>
            <p className="text-sm font-bold text-slate-800">Akash Sharma</p>
            <p className="mt-1 text-sm font-semibold leading-6 text-slate-500">
              Block C, Green Park, Sector 21<br/>
              New Delhi, 110016<br/>
              +91 98765 43210
            </p>
          </div>

          {/* Payment Summary */}
          <div className="soft-card rounded-[2rem] p-6">
            <h3 className="mb-4 text-base font-black">Payment Summary</h3>
            <div className="grid gap-3 text-sm">
              <div className="flex justify-between font-semibold text-slate-600">
                <span>Subtotal</span><span>Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between font-semibold text-slate-600">
                <span>Delivery Fee</span><span>Rs. {deliveryFee}</span>
              </div>
              <div className="flex justify-between font-semibold text-emerald-600">
                <span>Discount</span><span>- Rs. {discount}</span>
              </div>
              <div className="my-2 border-t border-sky-100" />
              <div className="flex justify-between text-base font-black text-brand-dark">
                <span>Total Paid</span><span>Rs. {total}</span>
              </div>
            </div>
            <div className="mt-6 rounded-xl bg-slate-50 p-3 text-center text-xs font-bold text-slate-500">
              Paid via UPI (Google Pay)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
