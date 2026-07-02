import Link from "next/link";
import {
  ArrowUpRight,
  Soup,
  Flame,
  UtensilsCrossed,
  Pizza,
  Leaf,
  Users,
  ShoppingBag,
  ShoppingCart,
  PhoneCall,
} from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen text-stone-100 flex items-center justify-start overflow-hidden bg-stone-950"
      style={{
        backgroundImage: "url('/image/landing2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* DEEP, SOPHISTICATED MATTE BLACK OVERLAY */}
      {/* Yeh image ko dabayega aur text ko ekdam crisp aur high-end dikhayega */}
      <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-[1px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/70 to-transparent" />

      {/* MAIN CONTAINER */}
      <div className="relative z-10 w-full px-6 sm:px-12 md:px-20 lg:px-32 py-24">
        <div className="max-w-4xl">
          {/* UNDERSTATED LUXURY TAG */}
          <p className="text-[10px] sm:text-xs tracking-[0.6em] uppercase text-amber-500/90 font-semibold mb-6 flex items-center gap-3">
            <span className="h-[1px] w-8 bg-amber-500/50 block" />
            Family Restaurant & Cafe
          </p>

          {/* MAIN HEADING (Clean, Bold, Elegant) */}
          <h1 className="tracking-tight text-white select-none font-serif font-bold text-[3.2rem] sm:text-[4.8rem] md:text-[6rem] leading-[0.95]">
            {/* KANHARIA WORD WITH ITS OWN TOP-RIGHT ARROW */}
            <span className="relative inline-block pr-8 sm:pr-10 md:pr-12 mr-3 sm:mr-4">
              Kanharia
              {/* MAP BUTTON: Locked to the top-right of "Kanharia" */}
              <a
                href="https://goo.gl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View on Map"
                className="group absolute top-0 right-0 translate-y-[-15%] flex h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full border border-stone-700 bg-stone-900/50 text-stone-400 hover:border-amber-500 hover:text-white transition-all duration-300 backdrop-blur-sm"
              >
                <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 md:h-4.5 md:w-4.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </span>

            {/* DARBAAR WORD CONTINUES NATURALLY */}
            <span className="text-white block sm:inline mt-1 sm:mt-0">
              Darbaar Cafe
            </span>
          </h1>

          {/* REFINED BRAND EXPERIENCE STATEMENT */}
          <p className="mt-6 max-w-xl text-sm sm:text-base md:text-lg text-stone-300/80 font-light leading-relaxed tracking-wide text-left">
            A symphony of authentic flavors crafted with precision. From
            intimate family dinners to celebratory gatherings, we elevate dining
            into a grand culinary affair.
          </p>

          {/* PRESTIGE CUISINES WITH YOUR IMPORTS */}
          {/* Mobile me single clean structured vertical sequence aur desktop me automatic inline text row */}
          <div className="mt-8 pt-6 border-t border-stone-900/60 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-y-3.5 sm:gap-x-8 text-[11px] sm:text-xs text-stone-400 font-medium tracking-widest uppercase">
            {/* Cuisine 1: Indian */}
            <div className="flex items-center justify-between sm:justify-start gap-3 pb-2 sm:pb-0 border-b border-stone-900/40 sm:border-none">
              <div className="flex items-center gap-2.5">
                <Soup className="h-4 w-4 text-amber-500/80 shrink-0" />
                <span>Indian</span>
              </div>
            </div>

            {/* Cuisine 2: Chinese */}
            <div className="flex items-center justify-between sm:justify-start gap-3 pb-2 sm:pb-0 border-b border-stone-900/40 sm:border-none">
              <div className="flex items-center gap-2.5">
                <Flame className="h-4 w-4 text-amber-500/80 shrink-0" />
                <span>Chinese</span>
              </div>
            </div>

            {/* Cuisine 3: Tandoor */}
            <div className="flex items-center justify-between sm:justify-start gap-3 pb-2 sm:pb-0 border-b border-stone-900/40 sm:border-none">
              <div className="flex items-center gap-2.5">
                <UtensilsCrossed className="h-4 w-4 text-amber-500/80 shrink-0" />
                <span>Tandoor</span>
              </div>
            </div>

            {/* Cuisine 4: Pizza */}
            <div className="flex items-center justify-between sm:justify-start gap-3 pb-2 sm:pb-0 border-b border-stone-900/40 sm:border-none">
              <div className="flex items-center gap-2.5">
                <Pizza className="h-4 w-4 text-amber-500/80 shrink-0" />
                <span>Pizza</span>
              </div>
            </div>

            {/* Cuisine 5: Biryani */}
            <div className="flex items-center justify-between sm:justify-start gap-3 sm:border-none">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-4 w-4 text-amber-500/80 shrink-0" />
                <span>Biryani</span>
              </div>
            </div>
          </div>

          {/* CTA BUTTONS (Sleek Contrast) */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-5">
            <Link
              href="/order-online"
              className="inline-flex items-center justify-center gap-2.5 rounded-none bg-amber-500 px-12 py-4 text-sm font-semibold tracking-widest uppercase text-black hover:bg-amber-400 transition-all duration-300 shadow-xl"
            >
              <ShoppingCart className="h-4 w-4 stroke-[2.5]" />
              Order Online
            </Link>

            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 rounded-none border border-stone-800 bg-stone-950/40 px-12 py-4 text-sm font-medium tracking-widest uppercase text-stone-300 hover:bg-stone-900 hover:text-white hover:border-stone-700 transition-all duration-300 backdrop-blur-sm"
            >
              <PhoneCall className="h-4 w-4" />
              Reservations
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
