"use client";

import { useState } from "react";
import { ChefHat, Bike, XCircle, LucideIcon } from "lucide-react";
import { AdminOrderStatus } from "@/types/admin-order";

type Props = {
  orderId: string;
  currentStatus: AdminOrderStatus;
  onUpdateStatus: (id: string, status: AdminOrderStatus) => void;
};

type ActionKey = "PREPARING" | "OUT_FOR_DELIVERY" | "CANCELLED";

type ActionConfig = {
  key: ActionKey;
  label: string;
  icon: LucideIcon;
  activeClasses: string;
  isDisabled: (currentStatus: AdminOrderStatus) => boolean;
};

const ACTIONS: ActionConfig[] = [
  {
    key: "PREPARING",
    label: "Preparing",
    icon: ChefHat,
    activeClasses:
      "border-amber-500/40 bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-black",
    isDisabled: (status) =>
      status === "PREPARING" || status === "OUT_FOR_DELIVERY",
  },
  {
    key: "OUT_FOR_DELIVERY",
    label: "Delivery",
    icon: Bike,
    activeClasses:
      "border-sky-500/40 bg-sky-500/10 text-sky-400 hover:bg-sky-500 hover:text-black",
    isDisabled: (status) => status === "OUT_FOR_DELIVERY",
  },
  {
    key: "CANCELLED",
    label: "Cancel",
    icon: XCircle,
    activeClasses:
      "border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white",
    isDisabled: (status) =>
      status === "PREPARING" || status === "OUT_FOR_DELIVERY",
  },
];

export default function AdminOrderActions({
  orderId,
  currentStatus,
  onUpdateStatus,
}: Props) {
  // Tracks which action was just clicked, so we can optimistically disable
  // it (and lock out "Cancel") before the parent's status update lands.
  const [actionTaken, setActionTaken] = useState<ActionKey | null>(null);

  const handleClick = (key: ActionKey) => {
    onUpdateStatus(orderId, key);
    setActionTaken(key);
  };

  return (
    <div className="grid grid-cols-3 gap-2 pt-4">
      {ACTIONS.map(({ key, label, icon: Icon, activeClasses, isDisabled }) => {
        const disabled =
          isDisabled(currentStatus) ||
          actionTaken === key ||
          (key === "CANCELLED" && actionTaken !== null);

        return (
          <button
            key={key}
            disabled={disabled}
            onClick={() => handleClick(key)}
            className={`flex w-full items-center justify-center gap-2 rounded-lg border px-3 py-3 text-[11px] font-semibold uppercase tracking-wide transition-colors duration-200 active:scale-[0.98] ${
              disabled
                ? "cursor-not-allowed border-stone-800 bg-stone-900 text-stone-500"
                : activeClasses
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
