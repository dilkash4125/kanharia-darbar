"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, UtensilsCrossed } from "lucide-react";
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

  // mobile menu
  const [open, setOpen] = useState(false);

  // login modal (desktop + mobile)
  const [loginOpen, setLoginOpen] = useState(false);

  // SSR hydration fix for Radix components
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
            className="ml-4 rounded-sm border border-stone-800 bg-neutral-900/40 px-6 py-2.5 text-xs font-bold tracking-[0.2em] uppercase text-stone-300 hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all duration-300 backdrop-blur-sm shadow-sm"
          >
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
              className="bg-neutral-950 text-stone-200 border-l border-stone-900/60 [&>button]:hidden flex flex-col justify-between"
            >
              <div>
                {/* MOBILE HEADER */}
                <div className="flex items-center justify-between mb-12 mt-4">
                  <SheetTitle className="text-xs font-semibold tracking-[0.3em] uppercase text-stone-500">
                    Menu
                  </SheetTitle>

                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-full p-2 border border-stone-900 text-stone-400 hover:bg-stone-900 hover:text-white transition-all duration-300"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* MOBILE LINKS: Uniform linear vertical spacing */}
                <div className="flex flex-col gap-8">
                  <Link
                    onClick={() => setOpen(false)}
                    href="/"
                    className={navClass("/")}
                  >
                    Home
                  </Link>
                  <Link
                    onClick={() => setOpen(false)}
                    href="/#about"
                    className={navClass("/#about")}
                  >
                    About
                  </Link>
                  <Link
                    onClick={() => setOpen(false)}
                    href="/#contact"
                    className={navClass("/#contact")}
                  >
                    Contact
                  </Link>
                </div>
              </div>

              {/* ADMIN LOGIN BUTTON (MOBILE): Fixed padding and solid layout */}
              <div className="mb-6">
                <button
                  onClick={() => {
                    setOpen(false);
                    setLoginOpen(true);
                  }}
                  className="w-full inline-flex items-center justify-center rounded-sm border border-stone-800 bg-neutral-900/30 px-6 py-4 text-xs font-bold tracking-[0.25em] uppercase text-amber-400 hover:bg-amber-400 hover:text-black transition-all duration-300"
                >
                  Admin Login
                </button>
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
