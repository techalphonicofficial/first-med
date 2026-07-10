"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const banners = [
  {
    title: "Fever care essentials",
    text: "Build a quick home kit with tablets, ORS and first-aid basics.",
    href: "/products/?category=Health%20Resource%20Center",
    image: "/product-images/first-aid-kit.svg",
    tone: "from-[#EAF7FF] via-white to-[#FFFCE8]"
  },
  {
    title: "Daily vitamins shelf",
    text: "Stock up on nutrition support and immunity boosters for the month.",
    href: "/products/?category=Vitamins%20%26%20Nutrition",
    image: "/product-images/vitamin-c-tablets.svg",
    tone: "from-[#FFFCE8] via-white to-[#E8FFF7]"
  },
  {
    title: "Personal care refresh",
    text: "Skin, hygiene and daily self-care products with fast delivery.",
    href: "/products/?category=Personal%20Care",
    image: "/product-images/demo-mint-bottle.svg",
    tone: "from-[#E8FFF7] via-white to-[#EAF7FF]"
  }
];

export function BannerCarousel({ compact = false }) {
  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3600, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        navigation={{
          prevEl: ".banner-prev",
          nextEl: ".banner-next"
        }}
        className="overflow-hidden rounded-[2rem] shadow-premium"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.title}>
            <Link href={banner.href} className={`grid min-h-[250px] items-center gap-6 bg-gradient-to-r ${banner.tone} p-6 sm:grid-cols-[1fr_260px] md:p-8 ${compact ? "lg:min-h-[260px]" : "lg:min-h-[310px]"}`}>
              <div>
                <span className="fm-pill">FirstMED care banner</span>
                <h3 className="mt-4 max-w-xl text-3xl font-black leading-tight text-brand-dark dark:text-white sm:text-5xl">{banner.title}</h3>
                <p className="mt-3 max-w-lg text-sm font-semibold leading-6 text-brand-gray sm:text-base">{banner.text}</p>
                <span className="mt-6 inline-flex rounded-full bg-brand-blue px-5 py-3 text-sm font-black text-white shadow-glow">Shop now</span>
              </div>
              <div className="relative mx-auto aspect-square w-full max-w-[230px] rounded-[2rem] bg-white/70 shadow-card">
                <Image src={banner.image} alt="" fill sizes="230px" className="object-contain p-8" />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute right-5 top-5 z-10 hidden gap-2 sm:flex">
        <button className="banner-prev grid size-11 place-items-center rounded-full bg-white text-brand-blue shadow-card" aria-label="Previous banner"><ArrowLeft size={18} /></button>
        <button className="banner-next grid size-11 place-items-center rounded-full bg-brand-blue text-white shadow-glow" aria-label="Next banner"><ArrowRight size={18} /></button>
      </div>
    </div>
  );
}
