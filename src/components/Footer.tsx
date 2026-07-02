import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-stone-400 font-sans border-t border-stone-900/60 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-12 md:px-20 lg:px-32">
        {/* UPPER ROW: Symmetrical Balance Between Brand & Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-8 pb-10 border-b border-stone-900/40">
          {/* BRAND LOGO TYPOGRAPHY */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-xl font-serif text-white font-bold tracking-tight">
              Kanharia Darbaar{" "}
              <span className="font-light italic text-amber-400/90 font-serif lowercase">
                cafe
              </span>
            </h3>
            <p className="text-[10px] tracking-[0.35em] uppercase text-stone-600 mt-1.5 font-medium">
              Grande Cafe & Family Restaurant
            </p>
          </div>

          {/* MINIMAL HORIZONTAL NAVIGATION */}
          <nav className="flex flex-wrap items-center justify-center sm:justify-end gap-x-8 gap-y-3 text-xs font-semibold tracking-[0.2em] uppercase">
            <Link
              href="/"
              className="hover:text-amber-400 transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              href="/#about"
              className="hover:text-amber-400 transition-colors duration-300"
            >
              Our Story
            </Link>
            <Link
              href="/#contact"
              className="hover:text-amber-400 transition-colors duration-300"
            >
              Reservations
            </Link>
          </nav>
        </div>

        {/* LOWER ROW: Pure Clean Benchmarks & Copyright */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between text-center lg:text-right gap-y-6 gap-x-8 text-[10px] sm:text-xs tracking-widest text-stone-500 font-medium uppercase">
          {/* CORE CUISINES IN ONE SLEEK BASEROW */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-stone-500/80">
            <span>Indian</span>
            <span className="text-stone-800 font-light">&bull;</span>
            <span>Chinese</span>
            <span className="text-stone-800 font-light">&bull;</span>
            <span>Tandoor</span>
            <span className="text-stone-800 font-light">&bull;</span>
            <span>Pizza</span>
            <span className="text-stone-800 font-light">&bull;</span>
            <span>Biryani</span>
          </div>

          {/* DIRECT SECURE COPYRIGHT */}
          <p className="text-stone-600 font-normal tracking-[0.1em]">
            &copy; {new Date().getFullYear()} Kanharia Darbaar. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
