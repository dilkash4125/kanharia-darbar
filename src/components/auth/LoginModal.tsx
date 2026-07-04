"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, ShieldCheck, LogIn, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

type Props = {
  onSuccess: () => void;
};

export default function LoginModal({ onSuccess }: Props) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email and password required");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("Invalid email or password");
      setLoading(false);
      return;
    }

    toast.success("Login successful");
    setLoading(false);

    router.push("/admin/orders");
  };

  return (
    <DialogContent className="overflow-hidden border border-stone-800 bg-gradient-to-b from-black via-stone-950 to-black p-0 text-white shadow-2xl sm:max-w-md">
      {/* HEADER */}
      <div className="border-b border-stone-800 px-8 py-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10">
            <ShieldCheck className="h-7 w-7 text-amber-400" />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-amber-500">
              Secure Access
            </p>

            <DialogTitle className="mt-2 font-serif text-3xl font-bold text-white">
              Admin Login
            </DialogTitle>

            <p className="mt-2 text-sm text-stone-400">
              Sign in to manage restaurant operations.
            </p>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="space-y-6 px-8 py-8">
        {/* EMAIL */}
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-400"
          >
            Email Address
          </Label>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />

            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@email.com"
              className="h-12 rounded-xl border-stone-800 bg-stone-950 pl-11 text-white placeholder:text-stone-600 focus-visible:border-amber-500 focus-visible:ring-amber-500"
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-400"
          >
            Password
          </Label>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />

            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-12 rounded-xl border-stone-800 bg-stone-950 pl-11 pr-12 text-white placeholder:text-stone-600 focus-visible:border-amber-500 focus-visible:ring-amber-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 transition hover:text-amber-400"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* LOGIN BUTTON */}
        <DialogClose asChild>
          <Button
            disabled={loading}
            onClick={handleLogin}
            className="mt-2 h-12 w-full rounded-xl bg-amber-500 text-sm font-bold uppercase tracking-[0.3em] text-black transition-all duration-300 hover:bg-amber-400 hover:shadow-xl hover:shadow-amber-500/30"
          >
            <LogIn className="mr-2 h-4 w-4" />
            {loading ? "Logging In..." : "Admin Login"}
          </Button>
        </DialogClose>
      </div>
    </DialogContent>
  );
}
