"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Phone, User } from "lucide-react";

type Props = {
  customerName: string;
  setCustomerName: (v: string) => void;
  mobile: string;
  setMobile: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  onPay: () => void;
  loading: boolean;
};

export default function UserDetailsAndPayment({
  customerName,
  setCustomerName,
  mobile,
  setMobile,
  location,
  setLocation,
  onPay,
  loading,
}: Props) {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setDateTime(
        new Date().toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      );
    };

    updateTime();
    const id = setInterval(updateTime, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="border border-stone-800 bg-stone-950/80 backdrop-blur p-6 lg:p-7 space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.5em] text-amber-500">
          <span className="block h-px w-7 bg-amber-500/60" />
          Customer Details
        </p>

        <h2 className="font-serif text-3xl font-bold text-white">
          Delivery Information
        </h2>

        <p className="text-sm leading-relaxed text-stone-400">
          Please provide your delivery details to complete your order.
        </p>
      </div>

      {/* Date */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-stone-400">
          <CalendarDays className="h-4 w-4 text-amber-500" />
          Date & Time
        </label>

        <input
          readOnly
          value={dateTime}
          className="h-12 w-full border border-stone-800 bg-stone-900/50 px-4 text-sm text-stone-300 outline-none"
        />
      </div>

      {/* Name */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-stone-400">
          <User className="h-4 w-4 text-amber-500" />
          Full Name
        </label>

        <input
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Enter your full name"
          className="h-12 w-full border border-stone-800 bg-stone-900/50 px-4 text-sm text-white placeholder:text-stone-600 outline-none transition focus:border-amber-500"
        />
      </div>

      {/* Mobile */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-stone-400">
          <Phone className="h-4 w-4 text-amber-500" />
          Mobile Number
        </label>

        <input
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="10 digit mobile number"
          className="h-12 w-full border border-stone-800 bg-stone-900/50 px-4 text-sm text-white placeholder:text-stone-600 outline-none transition focus:border-amber-500"
        />
      </div>

      {/* Address */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-stone-400">
          <MapPin className="h-4 w-4 text-amber-500" />
          Delivery Address
        </label>

        <textarea
          rows={4}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter complete delivery address..."
          className="w-full resize-none border border-stone-800 bg-stone-900/50 p-4 text-sm text-white placeholder:text-stone-600 outline-none transition focus:border-amber-500"
        />
      </div>

      {/* Button */}
      <Button
        onClick={onPay}
        disabled={loading}
        className="h-14 w-full rounded-none bg-amber-500 text-xs font-bold uppercase tracking-[0.25em] text-black transition hover:bg-amber-400"
      >
        {loading ? "Processing Payment..." : "Proceed to Payment"}
      </Button>
    </div>
  );
}
