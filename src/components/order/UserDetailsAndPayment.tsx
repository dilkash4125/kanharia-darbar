"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  customerName: string;
  setCustomerName: (v: string) => void;
  mobile: string;
  setMobile: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  onPay: () => void;
};

export default function UserDetailsAndPayment({
  customerName,
  setCustomerName,
  mobile,
  setMobile,
  location,
  setLocation,
  onPay,
}: Props) {
  const [dateTime, setDateTime] = useState("");

  // realtime date & time (16 Dec 2025, 02:45 PM)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const formatted = now.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short", // Dec
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      setDateTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-black/70 p-6 space-y-5">
      {/* HEADER */}
      <div className="space-y-1">
        <span className="text-[11px] tracking-[0.3em] uppercase text-orange-400">
          Customer Details
        </span>
        <h2 className="text-xl font-semibold tracking-tight">
          Delivery Information
        </h2>
      </div>

      {/* DATE & TIME */}
      <div className="space-y-1">
        <label className="text-sm text-gray-400">Date & Time</label>
        <input
          value={dateTime}
          readOnly
          className="w-full rounded-md bg-black/60 border border-white/20 px-4 py-2 text-sm text-gray-300 cursor-not-allowed"
        />
      </div>

      {/* NAME */}
      <div className="space-y-1">
        <label className="text-sm text-gray-400">Full Name</label>
        <input
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Enter your name"
          className="w-full rounded-md bg-black border border-white/20 px-4 py-2 text-sm outline-none focus:border-orange-500"
        />
      </div>

      {/* MOBILE */}
      <div className="space-y-1">
        <label className="text-sm text-gray-400">Mobile Number</label>
        <input
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="10 digit mobile number"
          className="w-full rounded-md bg-black border border-white/20 px-4 py-2 text-sm outline-none focus:border-orange-500"
        />
      </div>

      {/* ADDRESS */}
      <div className="space-y-1">
        <label className="text-sm text-gray-400">Delivery Address</label>
        <textarea
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter complete delivery address"
          rows={3}
          className="w-full resize-none rounded-md bg-black border border-white/20 px-4 py-2 text-sm outline-none focus:border-orange-500"
        />
      </div>

      {/* PAYMENT */}
      <Button
        onClick={onPay}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium tracking-wide"
      >
        Make Payment
      </Button>
    </div>
  );
}
