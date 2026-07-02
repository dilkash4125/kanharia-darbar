import { UtensilsCrossed, Phone, Clock, Utensils } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 text-stone-200 overflow-hidden bg-neutral-950"
    >
      {/* SOPHISTICATED LAYERED SEPARATOR LINE */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-stone-900/60 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-12 md:px-20 lg:px-32">
        {/* HEADER */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          {/* ELITE TAG SYSTEM */}
          <div className="flex items-center gap-3 mb-5">
            <span className="h-[1px] w-6 bg-amber-500/40 block" />
            <p className="text-[10px] tracking-[0.45em] uppercase text-amber-400 font-semibold">
              Reservations & Inquiries
            </p>
          </div>

          {/* HIGH-END FINE DINING SINGLE-LINE HEADING */}
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
        {/* Mobile par linear stack rows automatic with clean alignment guidelines */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 pt-4">
          {/* RESTAURANT INFO */}
          <div className="flex flex-col gap-4 p-5 sm:p-6 border border-stone-900 bg-neutral-950/40 backdrop-blur-md relative group">
            <div className="absolute top-0 left-0 w-[2px] h-6 bg-amber-500/40 group-hover:h-full transition-all duration-300" />
            <div className="h-10 w-10 border border-stone-800 bg-neutral-900/60 flex items-center justify-center text-amber-400/90 shrink-0">
              <UtensilsCrossed className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm tracking-wider uppercase font-bold text-white leading-none">
                Kanharia Darbaar
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
                Kanharia Bazaar, <br className="hidden sm:block" /> Purnea –
                854315
              </p>
            </div>
          </div>

          {/* PHONE INFO */}
          <div className="flex flex-col gap-4 p-5 sm:p-6 border border-stone-900 bg-neutral-950/40 backdrop-blur-md relative group">
            <div className="absolute top-0 left-0 w-[2px] h-6 bg-amber-500/40 group-hover:h-full transition-all duration-300" />
            <div className="h-10 w-10 border border-stone-800 bg-neutral-900/60 flex items-center justify-center text-amber-400/90 shrink-0">
              <Phone className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm tracking-wider uppercase font-bold text-white leading-none">
                Phone
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
                +91 9XXXXXXXXX <br className="hidden sm:block" />
                <span className="text-[10px] text-stone-500 uppercase tracking-widest font-medium block mt-0.5">
                  Direct Desk
                </span>
              </p>
            </div>
          </div>

          {/* HOURS INFO */}
          <div className="flex flex-col gap-4 p-5 sm:p-6 border border-stone-900 bg-neutral-950/40 backdrop-blur-md relative group">
            <div className="absolute top-0 left-0 w-[2px] h-6 bg-amber-500/40 group-hover:h-full transition-all duration-300" />
            <div className="h-10 w-10 border border-stone-800 bg-neutral-900/60 flex items-center justify-center text-amber-400/90 shrink-0">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm tracking-wider uppercase font-bold text-white leading-none">
                Opening Hours
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
                10:00 AM – 11:00 PM <br className="hidden sm:block" />
                <span className="text-[10px] text-stone-500 uppercase tracking-widest font-medium block mt-0.5">
                  Seven Days
                </span>
              </p>
            </div>
          </div>

          {/* SERVICES INFO */}
          <div className="flex flex-col gap-4 p-5 sm:p-6 border border-stone-900 bg-neutral-950/40 backdrop-blur-md relative group">
            <div className="absolute top-0 left-0 w-[2px] h-6 bg-amber-500/40 group-hover:h-full transition-all duration-300" />
            <div className="h-10 w-10 border border-stone-800 bg-neutral-900/60 flex items-center justify-center text-amber-400/90 shrink-0">
              <Utensils className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm tracking-wider uppercase font-bold text-white leading-none">
                Services
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
                Dine-In &bull; Takeaway <br className="hidden sm:block" />{" "}
                Family Seating
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
