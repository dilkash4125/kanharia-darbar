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
    <DialogContent className="sm:max-w-md bg-black text-white border border-white/10 rounded-xl p-0 overflow-hidden">
      <div className="px-6 pt-6 pb-7">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500/10 border border-orange-500/30">
              <ShieldCheck className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold leading-none">
                Admin Login
              </DialogTitle>
              <p className="mt-1.5 text-sm text-gray-400">
                Secure access to manage orders
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-7 space-y-4">
          {/* EMAIL */}
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-sm text-gray-300">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@email.com"
                className="pl-10 h-11 bg-white/[0.03] border-white/10 focus-visible:ring-1 focus-visible:ring-orange-500 focus-visible:border-orange-500 transition-colors"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-sm text-gray-300">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10 pr-10 h-11 bg-white/[0.03] border-white/10 focus-visible:ring-1 focus-visible:ring-orange-500 focus-visible:border-orange-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500 transition-colors"
                tabIndex={-1}
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
              className="w-full inline-flex items-center justify-center gap-2.5 rounded-none bg-amber-500 px-12 py-4 h-auto mt-1 text-sm font-semibold tracking-widest uppercase text-black hover:bg-amber-400 transition-all duration-300 shadow-xl disabled:opacity-60"
            >
              <LogIn className="h-4 w-4 stroke-[2.5]" />
              {loading ? "Logging in..." : "Login"}
            </Button>
          </DialogClose>
        </div>
      </div>
    </DialogContent>
  );
}
