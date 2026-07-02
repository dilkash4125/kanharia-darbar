import { Soup, Flame, UtensilsCrossed, Pizza, Sparkles } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 text-stone-200 overflow-hidden bg-neutral-950"
      style={{
        background:
          "radial-gradient(circle at top left, #0A0A0A 0%, #000000 100%)",
      }}
    >
      {/* SOPHISTICATED LAYERED SEPARATOR LINE */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-stone-900/60 to-transparent"></div>

      {/* CORE CONTAINER */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-12 md:px-20 lg:px-32">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* LEFT – PREMIUM ABOUT CONTENT */}
          <div className="max-w-xl">
            {/* ELITE TAG SYSTEM */}
            <div className="flex items-center gap-3 mb-5">
              <span className="h-[1px] w-6 bg-amber-500/40 block" />
              <p className="text-[10px] tracking-[0.45em] uppercase text-amber-400 font-semibold">
                Our Culinary Legacy
              </p>
            </div>

            {/* HIGH-END FINE DINING SINGLE-LINE HEADING */}
            <h2 className="select-none text-white font-serif">
              {/* Single-Line Master Title */}
              <span className="block font-bold tracking-tight leading-[1.05] text-[2.2rem] sm:text-[3.5rem] md:text-[4.5rem] text-stone-100">
                Kanharia Darbaar{" "}
                <span className="font-light italic text-amber-400/90 font-serif lowercase">
                  cafe
                </span>
              </span>
            </h2>

            {/* BRAND EXPERIENCE STORY */}
            <div className="mt-8 space-y-5 text-sm sm:text-base text-stone-300/80 font-light leading-relaxed tracking-wide text-left">
              <p>
                Kanharia Darbaar Cafe stands as a hallmark of exceptional
                hospitality and gourmet mastery. We bring together a rich
                culinary heritage, combining premium ingredients with masterful
                techniques to craft dishes that define fine dining.
              </p>
              <p>
                Whether it is the rich essence of traditional Indian recipes,
                modern Pan-Asian flavors, smoky charcoal Tandoor creations, or
                artisanal pizzas and royal biryanis—every single plate is served
                as an absolute masterpiece.
              </p>
            </div>

            {/* PRESTIGE CUISINES: 100% Symmetrical Mobile Rows with Matching Icons */}
            <div className="mt-10 pt-6 border-t border-stone-900/60 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-y-3.5 sm:gap-x-8 text-[11px] sm:text-xs text-stone-400 font-semibold tracking-widest uppercase">
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
                  <Sparkles className="h-4 w-4 text-amber-500/80 shrink-0" />
                  <span>Biryani</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT – OWNER / FOUNDER PROFILE */}
          <div className="flex justify-center md:justify-end text-left w-full">
            <div className="w-full max-w-sm border border-stone-900 bg-neutral-950/40 p-8 sm:p-10 backdrop-blur-md rounded-none shadow-xl relative group">
              {/* Subtle visual accent strip on hover */}
              <div className="absolute top-0 left-0 w-[2px] h-8 bg-amber-500/40 group-hover:h-full transition-all duration-500" />

              {/* Owner Avatar: Minimal & Sharp Layout */}
              <div className="h-28 w-28 rounded-none border border-stone-800 bg-neutral-900/60 flex items-center justify-center text-stone-500 text-xs font-medium uppercase tracking-wider overflow-hidden">
                <span>Owner Photo</span>
              </div>

              {/* Owner Meta Data */}
              <h3 className="mt-8 text-xl sm:text-2xl font-bold text-white tracking-tight uppercase">
                Enter Name Here
              </h3>

              <p className="mt-1.5 text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold">
                Owner & Founder
              </p>

              {/* Fine Poetic Quote */}
              <p className="mt-6 text-sm text-stone-400 font-light italic leading-relaxed tracking-wide border-l border-stone-800/80 pl-4">
                &ldquo;Our vision is simple &mdash; to deliver an unparalleled
                dining experience rooted in honesty, masterly consistency, and
                flavors that families celebrate and return for.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
