"use client";

import { Clock } from "lucide-react";

type Props = {
  customerName: string;
  orderId: string;
  orderDateTime: string; // ✅ DB datetime (ISO)
};

/* ================= SAFE FORMATTER ================= */
const formatDateTime = (value: string) => {
  const d = new Date(value);
  if (isNaN(d.getTime())) return "";

  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export default function OrderConfirmation({
  customerName,
  orderId,
  orderDateTime,
}: Props) {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-black/70 p-8 text-center space-y-6">
      {/* ================= SUCCESS TITLE ================= */}
      <div className="space-y-1">
        <span className="text-[11px] tracking-[0.3em] uppercase text-green-400">
          Success
        </span>
        <h2 className="text-2xl font-semibold tracking-tight text-green-400">
          Order Confirmed
        </h2>
      </div>

      {/* ================= MESSAGE ================= */}
      <p className="text-sm text-gray-300 leading-relaxed">
        Thank you <span className="text-white font-medium">{customerName}</span>
        , your order has been successfully placed.
      </p>

      {/* ================= ORDER DATE & TIME ================= */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
        <Clock className="h-4 w-4 text-gray-400" />
        <span>{formatDateTime(orderDateTime)}</span>
      </div>

      {/* ================= ORDER CODE BOX ================= */}
      <div className="rounded-md border border-white/10 py-4 space-y-1">
        <p className="text-xs tracking-widest uppercase text-gray-400">
          Order Id
        </p>
        <p className="text-lg font-semibold text-orange-500">{orderId}</p>
      </div>

      {/* ================= HELP TEXT ================= */}
      <p className="text-xs text-gray-400">
        Take screenshot your Order Id to track your order status.
      </p>
    </div>
  );
}
