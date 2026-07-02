"use client";

import {
  Hash,
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

/* ================= STATUS ICON ================= */
function StatusIcon({ status }: { status: AdminOrderStatus }) {
  switch (status) {
    case "RECEIVED":
      return <Inbox className="h-3.5 w-3.5 text-blue-400" />;
    case "PREPARING":
      return <ChefHat className="h-3.5 w-3.5 text-orange-400" />;
    case "OUT_FOR_DELIVERY":
      return <Bike className="h-3.5 w-3.5 text-yellow-400" />;
    case "DELIVERED":
      return <BadgeCheck className="h-3.5 w-3.5 text-green-400" />;
    case "CANCELLED":
      return <XCircle className="h-3.5 w-3.5 text-red-400" />;
    default:
      return null;
  }
}

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

  return (
    <div className="rounded-2xl border border-white/10 bg-black/70 p-6">
      {/* MAIN CONTENT */}
      <div className="flex flex-col gap-5">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-gray-500">
              <Hash className="h-3.5 w-3.5 text-gray-500" />
              Order ID
            </div>

            <p className="text-sm font-semibold tracking-normal text-orange-500">
              {order.orderCode}
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-gray-300">
            <StatusIcon status={order.status} />
            {order.status.replaceAll("_", " ")}
          </span>
        </div>

        {/* CUSTOMER */}
        <div className="space-y-1 text-sm text-gray-200">
          {orderTime && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span>{orderTime}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-400" />
            <span>{order.customerName}</span>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gray-400" />
            <span>{order.mobile}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-300">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{order.address}</span>
          </div>
        </div>

        {/* ITEMS */}
        <AdminOrderItems items={order.items} />

        {/* TOTAL */}
        <AdminOrderTotal total={order.total} />

        {/* DELIVERY CODE */}
        {order.deliveryCode && (
          <AdminDeliveryCodeBox code={order.deliveryCode} />
        )}

        {/* FINAL SECTION (FIXED RHYTHM) */}
        <div className="pt-2">
          {order.status === "DELIVERED" && (
            <div className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-green-500/40 bg-green-500/10 py-2 text-sm font-medium text-green-400">
              <BadgeCheck className="h-4 w-4" />
              Order Completed
            </div>
          )}

          {order.status === "CANCELLED" && (
            <div className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-red-500/40 bg-red-500/10 py-2 text-sm font-medium text-red-400">
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
    </div>
  );
}
