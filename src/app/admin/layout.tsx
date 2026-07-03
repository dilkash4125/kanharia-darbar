"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/");
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-400">
        Checking authentication...
      </div>
    );
  }

  const linkClass = (href: string) =>
    `text-sm font-medium tracking-wide transition ${
      pathname === href
        ? "text-orange-400"
        : "text-gray-300 hover:text-orange-400"
    }`;

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-stone-800 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          <div className="flex flex-col items-start gap-8">
            {/* LEFT */}
            <div className="space-y-5">
              <p className="flex items-center gap-3 text-[10px] md:text-xs font-semibold uppercase tracking-[0.5em] text-amber-500">
                <span className="block h-px w-8 bg-amber-500/60" />
                Admin Dashboard
              </p>

              <div className="space-y-2">
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-none tracking-tight text-white">
                  Manage
                  <span className="block text-amber-400">Online Orders</span>
                </h1>

                <span className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
                  Kanharia Darbaar Cafe
                </span>
              </div>

              <p className="max-w-xl text-sm leading-7 text-stone-400 md:text-base">
                Monitor incoming orders, update kitchen progress, manage
                deliveries, and complete customer orders in real time from one
                dashboard.
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex flex-wrap items-center justify-start gap-3">
              <Link
                href="/admin/orders"
                className={`
            whitespace-nowrap
            border
            px-5 py-2.5
            text-[11px] md:text-xs
            font-semibold
            uppercase
            tracking-[0.25em]
            transition-all
            duration-300
            ${
              pathname === "/admin/orders"
                ? "border-amber-500 bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                : "border-stone-800 bg-stone-950/60 text-stone-400 hover:border-amber-500 hover:bg-stone-900 hover:text-white"
            }
          `}
              >
                Orders
              </Link>

              <Link
                href="/admin/completed-orders"
                className={`
            whitespace-nowrap
            border
            px-5 py-2.5
            text-[11px] md:text-xs
            font-semibold
            uppercase
            tracking-[0.25em]
            transition-all
            duration-300
            ${
              pathname === "/admin/completed-orders"
                ? "border-amber-500 bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                : "border-stone-800 bg-stone-950/60 text-stone-400 hover:border-amber-500 hover:bg-stone-900 hover:text-white"
            }
          `}
              >
                Completed
              </Link>

              <button
                onClick={handleLogout}
                className="border border-red-500/40 bg-red-500/10 px-5 py-2.5 text-[11px] md:text-xs font-semibold uppercase tracking-[0.25em] text-red-400 transition-all duration-300 hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="w-full ">{children}</main>
    </div>
  );
}
