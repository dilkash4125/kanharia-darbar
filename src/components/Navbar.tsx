"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, UtensilsCrossed, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Dialog } from "@/components/ui/dialog";
import LoginModal from "@/components/auth/LoginModal";

export default function Navbar() {
  const pathname = usePathname();

  // Mobile drawer
  const [open, setOpen] = useState(false);

  // Login modal
  const [loginOpen, setLoginOpen] = useState(false);

  // SSR hydration
  const [mounted, setMounted] = useState(false);

  // Active mobile menu
  const [activeMenu, setActiveMenu] = useState<"Home" | "About" | "Contact">(
    "Home",
  );

  useEffect(() => {
    setMounted(true);

    const updateActiveMenu = () => {
      if (typeof window === "undefined") return;

      const hash = window.location.hash;

      if (hash === "#about") {
        setActiveMenu("About");
      } else if (hash === "#contact") {
        setActiveMenu("Contact");
      } else {
        setActiveMenu("Home");
      }
    };

    updateActiveMenu();

    window.addEventListener("hashchange", updateActiveMenu);

    return () => {
      window.removeEventListener("hashchange", updateActiveMenu);
    };
  }, []);

  const navClass = (href: string) =>
    `text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300 ${
      pathname === href ? "text-amber-400" : "text-stone-400 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-stone-900/60">
      {/* SPACING: Height h-16 se h-20 ki hai taaki elements ko saans lene ki jagah mile */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
        {/* BRAND LOGO: Same text and icon, just polished spacing */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <UtensilsCrossed className="h-6 w-6 text-amber-400 shrink-0 transition-transform duration-300 group-hover:rotate-45" />
          <div className="flex flex-col leading-none">
            <span className="text-xl sm:text-2xl font-serif tracking-tight text-white font-bold select-none">
              Kanharia Darbaar{" "}
              <span className="font-light italic text-amber-400/90 font-serif lowercase ml-0.5">
                cafe
              </span>
            </span>
            <span className="text-[10px] tracking-[0.35em] uppercase text-stone-500 mt-1 font-medium">
              Cafe & Family Restaurant
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV: Spacing gaps optimized to gap-9 */}
        <nav className="hidden md:flex items-center gap-9">
          <Link href="/" className={navClass("/")}>
            Home
          </Link>
          <Link href="/#about" className={navClass("/#about")}>
            About
          </Link>
          <Link href="/#contact" className={navClass("/#contact")}>
            Contact
          </Link>

          {/* LUXURY BUTTON: Clean geometric rounded-none borders */}
          <button
            onClick={() => setLoginOpen(true)}
            className="ml-4 inline-flex items-center gap-2 border border-amber-500 bg-amber-500 px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/30 active:translate-y-0"
          >
            <Lock className="h-3.5 w-3.5" />
            Login
          </button>
        </nav>

        {/* MOBILE MENU */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              {/* BUTTON: Clean square trigger to match the brand layout */}
              <button className="rounded-sm border border-stone-900 bg-stone-950/40 p-2.5 text-stone-400 hover:text-white hover:border-stone-700 transition-all duration-300">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[320px] border-l border-stone-800 bg-gradient-to-b from-black via-stone-950 to-black p-0 text-white [&>button]:hidden"
            >
              <div className="flex h-full flex-col">
                {/* HEADER */}
                <div className="relative border-b border-stone-800 px-6 py-8">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.45em] text-amber-500">
                      Menu
                    </p>

                    {/* FIX: h2 ko SheetTitle bana diya (Radix accessibility requirement, crash fix) */}
                    <SheetTitle className="mt-2 font-serif text-2xl font-bold text-white">
                      Kanharia Darbaar
                    </SheetTitle>

                    <p className="mt-1 text-xs tracking-[0.25em] uppercase text-stone-500">
                      Cafe & Family Restaurant
                    </p>
                  </div>

                  {/* CLOSE ICON: top-8 right-6 kiya taaki container ke px-6 py-8 padding ke saath perfectly align ho, symmetric aur balanced lage */}
                  <button
                    onClick={() => setOpen(false)}
                    className="absolute right-4 top-8 rounded-full border border-stone-800 p-2 text-stone-400 transition hover:border-amber-500 hover:text-amber-400"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* MENU */}
                <div className="flex-1 px-6 py-8">
                  <nav className="space-y-2">
                    {[
                      { href: "/", label: "Home" as const },
                      { href: "/#about", label: "About" as const },
                      { href: "/#contact", label: "Contact" as const },
                    ].map((item) => {
                      const active = activeMenu === item.label;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => {
                            setActiveMenu(item.label);
                            setOpen(false);
                          }}
                          className={`flex items-center justify-between border-b border-stone-900 py-5 transition-all duration-300 ${
                            active
                              ? "text-amber-400"
                              : "text-stone-300 hover:text-white"
                          }`}
                        >
                          <span className="text-lg font-medium tracking-wide">
                            {item.label}
                          </span>

                          {active && (
                            <span className="h-2 w-2 rounded-full bg-amber-400" />
                          )}
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                {/* FOOTER */}
                <div className="border-t border-stone-800 p-6 space-y-5">
                  <button
                    onClick={() => {
                      setOpen(false);
                      setLoginOpen(true);
                    }}
                    className="w-full border border-amber-500 bg-amber-500 py-3 text-xs font-bold uppercase tracking-[0.3em] text-black transition hover:bg-amber-400"
                  >
                    Admin Login
                  </button>

                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-stone-600">
                      Premium Dining Experience
                    </p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* SINGLE GLOBAL LOGIN MODAL (SSR SAFE) */}
      {mounted && (
        <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
          <LoginModal onSuccess={() => setLoginOpen(false)} />
        </Dialog>
      )}
    </header>
  );
}
