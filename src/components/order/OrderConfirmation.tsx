"use client";

import { BadgeCheck, Clock, ReceiptText } from "lucide-react";

type Props = {
  customerName: string;
  orderId: string;
  orderDateTime: string;
};

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
    <div className="mx-auto max-w-lg border border-stone-800 bg-stone-950/90 backdrop-blur p-8 md:p-10 text-center space-y-8">
      {/* Header */}
      <div className="space-y-5">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
          <BadgeCheck className="h-10 w-10 text-emerald-400" />
        </div>

        <div>
          <p className="flex items-center justify-center gap-3 text-[10px] font-semibold uppercase tracking-[0.5em] text-amber-500">
            <span className="block h-px w-7 bg-amber-500/60" />
            Order Successful
            <span className="block h-px w-7 bg-amber-500/60" />
          </p>

          <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight text-white">
            Order Confirmed
          </h2>

          <p className="mt-4 text-sm leading-7 text-stone-400">
            Thank you{" "}
            <span className="font-semibold text-white">{customerName}</span>.
            Your order has been received successfully and our kitchen has
            started preparing it.
          </p>
        </div>
      </div>

      {/* Order Details */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border border-stone-800 bg-stone-900/50 px-5 py-4">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-amber-500" />
            <span className="text-sm uppercase tracking-[0.2em] text-stone-400">
              Order Time
            </span>
          </div>

          <span className="text-sm font-medium text-white">
            {formatDateTime(orderDateTime)}
          </span>
        </div>

        <div className="border border-amber-500/30 bg-amber-500/5 p-6">
          <div className="flex items-center justify-center gap-2">
            <ReceiptText className="h-5 w-5 text-amber-500" />

            <span className="text-[10px] uppercase tracking-[0.35em] text-stone-400">
              Order ID
            </span>
          </div>

          <p className="mt-3 break-all font-mono text-2xl font-bold tracking-widest text-amber-400">
            {orderId}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-stone-800 pt-6">
        <p className="text-sm leading-6 text-stone-400">
          Please save your{" "}
          <span className="font-semibold text-amber-400">Order ID</span> for
          future order tracking and support.
        </p>
      </div>
    </div>
  );
}
