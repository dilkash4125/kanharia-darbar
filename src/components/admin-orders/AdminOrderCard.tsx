"use client";

import {
  Inbox,
  ChefHat,
  Bike,
  BadgeCheck,
  XCircle,
  User,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

import { AdminOrder, AdminOrderStatus } from "@/types/admin-order";
import AdminOrderItems from "./AdminOrderItems";
import AdminOrderTotal from "./AdminOrderTotal";
import AdminOrderActions from "./AdminOrderActions";
import AdminDeliveryCodeBox from "./AdminDeliveryCodeBox";

type Props = {
  order: AdminOrder;
  onUpdateStatus: (id: string, status: AdminOrderStatus) => void;
};

/* ================= STATUS CONFIG ================= */
const STATUS_CONFIG: Record<
  AdminOrderStatus,
  { icon: typeof Inbox; color: string; ring: string }
> = {
  RECEIVED: {
    icon: Inbox,
    color: "text-blue-400",
    ring: "border-blue-500/30 bg-blue-500/10",
  },
  PREPARING: {
    icon: ChefHat,
    color: "text-orange-400",
    ring: "border-orange-500/30 bg-orange-500/10",
  },
  OUT_FOR_DELIVERY: {
    icon: Bike,
    color: "text-yellow-400",
    ring: "border-yellow-500/30 bg-yellow-500/10",
  },
  DELIVERED: {
    icon: BadgeCheck,
    color: "text-green-400",
    ring: "border-green-500/30 bg-green-500/10",
  },
  CANCELLED: {
    icon: XCircle,
    color: "text-red-400",
    ring: "border-red-500/30 bg-red-500/10",
  },
};

/* ================= DATE FORMATTER ================= */
const formatDateTime = (value?: string | null) => {
  if (!value) return null;

  const d = new Date(value);
  if (isNaN(d.getTime())) return null;

  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export default function AdminOrderCard({ order, onUpdateStatus }: Props) {
  const locked = order.status === "DELIVERED" || order.status === "CANCELLED";
  const orderTime = formatDateTime(order.orderDateTime);
  const status = STATUS_CONFIG[order.status];
  const StatusIconComp = status?.icon;

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-800 bg-gradient-to-b from-stone-950 via-stone-950 to-black shadow-2xl transition-all duration-300 hover:border-amber-500/40 hover:shadow-amber-500/10">
      {/* HEADER */}
      <div className="border-b border-stone-800 bg-stone-900/70 px-6 py-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
              Order
            </p>
            <h2 className="mt-1.5 font-mono text-2xl font-bold tracking-wider text-white">
              #{order.orderCode}
            </h2>
          </div>

          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500">
              Total
            </p>
            <p className="mt-1.5 text-3xl font-bold text-amber-400">
              ₹{order.total}
            </p>
          </div>
        </div>

        <div
          className={`mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] ${status?.ring} ${status?.color}`}
        >
          {StatusIconComp && <StatusIconComp className="h-3.5 w-3.5" />}
          {order.status.replaceAll("_", " ")}
        </div>
      </div>

      {/* CUSTOMER */}
      <div className="space-y-3.5 px-6 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10">
            <User className="h-3.5 w-3.5 text-amber-400" />
          </div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-500">
            Customer
          </h3>
        </div>

        <div className="space-y-2.5 pl-1">
          {orderTime && (
            <div className="flex items-center gap-3 text-sm text-stone-300">
              <Clock className="h-4 w-4 shrink-0 text-stone-500" />
              {orderTime}
            </div>
          )}

          <div className="flex items-center gap-3 text-sm text-stone-300">
            <User className="h-4 w-4 shrink-0 text-stone-500" />
            {order.customerName}
          </div>

          <div className="flex items-center gap-3 text-sm text-stone-300">
            <Phone className="h-4 w-4 shrink-0 text-stone-500" />
            {order.mobile}
          </div>

          <div className="flex items-start gap-3 text-sm text-stone-300">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-stone-500" />
            <span>{order.address}</span>
          </div>
        </div>
      </div>

      {/* ITEMS */}
      <div className="border-t border-stone-800 px-6 py-5">
        <AdminOrderItems items={order.items} />
      </div>

      {/* TOTAL */}
      <div className="border-t border-stone-800 px-6 py-5">
        <AdminOrderTotal total={order.total} />
      </div>

      {/* DELIVERY CODE */}
      {order.deliveryCode && (
        <div className="border-t border-stone-800 px-6 py-5">
          <AdminDeliveryCodeBox code={order.deliveryCode} />
        </div>
      )}

      {/* FOOTER */}
      <div className="border-t border-stone-800 px-6 py-5">
        {order.status === "DELIVERED" && (
          <div className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 py-3.5 text-sm font-medium text-emerald-400">
            <BadgeCheck className="h-4 w-4" />
            Order Completed Successfully
          </div>
        )}

        {order.status === "CANCELLED" && (
          <div className="flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 py-3.5 text-sm font-medium text-red-400">
            <XCircle className="h-4 w-4" />
            Order Cancelled
          </div>
        )}

        {!locked && (
          <AdminOrderActions
            orderId={order.id}
            currentStatus={order.status}
            onUpdateStatus={onUpdateStatus}
          />
        )}
      </div>
    </div>
  );
}
