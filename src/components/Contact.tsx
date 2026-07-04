"use client";

import { useEffect, useState } from "react";
import {
  UtensilsCrossed,
  Phone,
  Clock,
  Utensils,
  ArrowUpRight,
} from "lucide-react";

const PHONE_DISPLAY = "+91 9XXXXXXXXX";
const PHONE_TEL = "+919XXXXXXXXX"; // replace with real number
const MAPS_QUERY = encodeURIComponent(
  "Kanharia Darbaar, Kanharia Bazaar, Purnea 854315",
);

function useIsOpenNow(openHour = 10, closeHour = 23) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const check = () => {
      const hour = new Date().getHours();
      setIsOpen(hour >= openHour && hour < closeHour);
    };
    check();
    const id = setInterval(check, 60 * 1000);
    return () => clearInterval(id);
  }, [openHour, closeHour]);

  return isOpen;
}

export default function Contact() {
  const isOpen = useIsOpenNow();

  const infoCards = [
    {
      icon: UtensilsCrossed,
      label: "Kanharia Darbaar",
      content: (
        <>
          Kanharia Bazaar, <br className="hidden sm:block" /> Purnea – 854315
        </>
      ),
      href: `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`,
      external: true,
      cta: "Open in Maps",
    },
    {
      icon: Phone,
      label: "Phone",
      content: (
        <>
          {PHONE_DISPLAY}
          <span className="text-[10px] text-stone-500 uppercase tracking-widest font-medium block mt-0.5">
            Direct Desk
          </span>
        </>
      ),
      href: `tel:${PHONE_TEL}`,
      cta: "Tap to Call",
    },
    {
      icon: Clock,
      label: "Opening Hours",
      content: (
        <>
          10:00 AM – 11:00 PM
          <span className="text-[10px] text-stone-500 uppercase tracking-widest font-medium block mt-0.5">
            Seven Days
          </span>
        </>
      ),
      badge:
        isOpen === null ? null : isOpen ? (
          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-semibold text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Open Now
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-semibold text-stone-500">
            <span className="h-1.5 w-1.5 rounded-full bg-stone-600" />
            Closed Now
          </span>
        ),
    },
    {
      icon: Utensils,
      label: "Services",
      content: (
        <>
          Dine-In &bull; Takeaway <br className="hidden sm:block" /> Family
          Seating
        </>
      ),
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 text-stone-200 overflow-hidden bg-neutral-950"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-stone-900/60 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-12 md:px-20 lg:px-32">
        {/* HEADER */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-[1px] w-6 bg-amber-500/40 block" />
            <p className="text-[10px] tracking-[0.45em] uppercase text-amber-400 font-semibold">
              Reservations & Inquiries
            </p>
          </div>

          <h2 className="select-none text-white font-serif">
            <span className="block font-bold tracking-tight leading-[1.05] text-[2.2rem] sm:text-[3.5rem] md:text-[4.5rem] text-stone-100">
              Visit or{" "}
              <span className="font-light italic text-amber-400/90 font-serif lowercase">
                call us
              </span>
            </span>
          </h2>

          <p className="mt-6 text-sm sm:text-base text-stone-300/80 font-light leading-relaxed tracking-wide">
            We are delighted to serve freshly prepared masterpieces every single
            day. Visit our dining room or connect with us directly for bespoke
            takeaway orders and private lounge inquiries.
          </p>
        </div>

        {/* CONTACT INFO GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 pt-4">
          {infoCards.map(
            ({ icon: Icon, label, content, href, external, cta, badge }) => {
              const CardInner = (
                <>
                  <div className="absolute top-0 left-0 w-[2px] h-6 bg-amber-500/40 group-hover:h-full transition-all duration-300" />
                  <div className="flex items-start justify-between">
                    <div className="h-10 w-10 border border-stone-800 bg-neutral-900/60 flex items-center justify-center text-amber-400/90 shrink-0 group-hover:border-amber-400/40 group-hover:bg-amber-400/5 transition-colors duration-300">
                      <Icon className="h-4 w-4" />
                    </div>
                    {href && (
                      <ArrowUpRight className="h-4 w-4 text-stone-700 group-hover:text-amber-400/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm tracking-wider uppercase font-bold text-white leading-none">
                        {label}
                      </h4>
                      {badge}
                    </div>
                    <p className="mt-2 text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
                      {content}
                    </p>
                    {cta && (
                      <span className="mt-3 inline-block text-[10px] uppercase tracking-widest font-semibold text-stone-600 group-hover:text-amber-400/80 transition-colors duration-300">
                        {cta}
                      </span>
                    )}
                  </div>
                </>
              );

              const baseClasses =
                "group relative flex flex-col gap-4 p-5 sm:p-6 border border-stone-900 bg-neutral-950/40 backdrop-blur-md transition-colors duration-300 hover:border-stone-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950";

              return href ? (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className={baseClasses}
                >
                  {CardInner}
                </a>
              ) : (
                <div key={label} className={baseClasses}>
                  {CardInner}
                </div>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}
