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
      {/* TOP BAR */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* NAV */}
          <nav className="flex items-center gap-8">
            <Link href="/admin/orders" className={linkClass("/admin/orders")}>
              Orders
            </Link>
            <Link
              href="/admin/completed-orders"
              className={linkClass("/admin/completed-orders")}
            >
              Completed Orders
            </Link>
          </nav>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-red-400 transition"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="mx-auto max-w-7xl px-6 py-6">{children}</main>
    </div>
  );
}
