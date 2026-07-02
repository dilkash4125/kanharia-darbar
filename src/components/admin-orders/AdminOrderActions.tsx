"use client";

import { useState } from "react";
import { Inbox, ChefHat, Bike, XCircle } from "lucide-react";
import { AdminOrderStatus } from "@/types/admin-order";

type Props = {
  orderId: string;
  onUpdateStatus: (id: string, status: AdminOrderStatus) => void;
};

export default function AdminOrderActions({ orderId, onUpdateStatus }: Props) {
  // track which button is pressed
  const [pressed, setPressed] = useState<{
    received: boolean;
    preparing: boolean;
    outForDelivery: boolean;
    cancel: boolean;
    anyAction: boolean; // for cancel auto-disable
  }>({
    received: false,
    preparing: false,
    outForDelivery: false,
    cancel: false,
    anyAction: false,
  });

  return (
    <div className="flex flex-wrap gap-2 pt-3">
      {/* RECEIVED */}
      <button
        disabled={pressed.received}
        onClick={() => {
          onUpdateStatus(orderId, "RECEIVED");
          setPressed((p) => ({
            ...p,
            received: true,
            anyAction: true, // disables cancel
          }));
        }}
        className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition
          ${
            pressed.received
              ? "cursor-not-allowed border border-white/10 text-gray-500"
              : "border border-white/15 bg-white/5 text-gray-200 hover:border-white/25 hover:bg-white/10"
          }`}
      >
        <Inbox className="h-4 w-4 text-orange-400" />
        Received
      </button>

      {/* PREPARING */}
      <button
        disabled={pressed.preparing}
        onClick={() => {
          onUpdateStatus(orderId, "PREPARING");
          setPressed((p) => ({
            ...p,
            preparing: true,
            anyAction: true, // disables cancel
          }));
        }}
        className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition
          ${
            pressed.preparing
              ? "cursor-not-allowed border border-white/10 text-gray-500"
              : "border border-white/15 bg-white/5 text-gray-200 hover:border-white/25 hover:bg-white/10"
          }`}
      >
        <ChefHat className="h-4 w-4 text-orange-400" />
        Preparing
      </button>

      {/* OUT FOR DELIVERY */}
      <button
        disabled={pressed.outForDelivery}
        onClick={() => {
          onUpdateStatus(orderId, "OUT_FOR_DELIVERY");
          setPressed((p) => ({
            ...p,
            outForDelivery: true,
            anyAction: true, // disables cancel
          }));
        }}
        className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition
          ${
            pressed.outForDelivery
              ? "cursor-not-allowed bg-orange-600/40 text-orange-200"
              : "bg-orange-600 text-white hover:bg-orange-700"
          }`}
      >
        <Bike className="h-4 w-4" />
        Out for Delivery
      </button>

      {/* CANCEL */}
      <button
        disabled={pressed.cancel || pressed.anyAction}
        onClick={() => {
          onUpdateStatus(orderId, "CANCELLED");
          setPressed((p) => ({
            ...p,
            cancel: true,
          }));
        }}
        className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition
          ${
            pressed.cancel || pressed.anyAction
              ? "cursor-not-allowed border border-white/10 text-gray-500"
              : "border border-red-500/40 bg-red-500/5 text-red-400 hover:bg-red-500/10"
          }`}
      >
        <XCircle className="h-4 w-4" />
        Cancel
      </button>
    </div>
  );
}
