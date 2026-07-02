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
import { Mail, Lock, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function LoginModal() {
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
    <DialogContent className="sm:max-w-md bg-black text-white border border-white/10 rounded-xl">
      <DialogHeader>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-orange-500" />
          <DialogTitle className="text-2xl font-semibold">
            Admin Login
          </DialogTitle>
        </div>
        <p className="text-sm text-gray-400">Secure access to manage orders</p>
      </DialogHeader>

      <div className="mt-6 space-y-5">
        {/* EMAIL */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm text-gray-300">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@email.com"
              className="pl-10 bg-black border-white/20 focus:border-orange-500"
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-sm text-gray-300">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="pl-10 bg-black border-white/20 focus:border-orange-500"
            />
          </div>

          {/* SHOW / HIDE PASSWORD */}
          <div className="flex items-center gap-2 pt-1">
            <input
              id="show-password"
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="h-4 w-4 rounded border-white/30 bg-black text-orange-500 focus:ring-orange-500"
            />
            <Label
              htmlFor="show-password"
              className="text-xs text-gray-400 cursor-pointer"
            >
              Show password
            </Label>
          </div>
        </div>

        {/* LOGIN BUTTON */}
        <DialogClose asChild>
          <Button
            variant="outline"
            disabled={loading}
            onClick={handleLogin}
            className="w-full border-orange-500 text-orange-400 hover:bg-orange-600 hover:text-white"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </DialogClose>
      </div>
    </DialogContent>
  );
}
