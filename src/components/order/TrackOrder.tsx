"use client";

import { useEffect, useState } from "react";
import {
  PackageSearch,
  User,
  Phone,
  MapPin,
  KeyRound,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
} from "lucide-react";
import OrderStatusTimeline from "./OrderStatusTimeline";
import { supabase } from "@/lib/supabase";

/* ================= USER STATUS ================= */

type UserStatus =
  | "CONFIRMED"
  | "PREPARING"
  | "OUT_FOR_DELIVERY"
  | "DELIVERY_CODE"
  | "DELIVERED"
  | "CANCELLED";

/* ================= DB ORDER TYPE ================= */

type DbOrder = {
  id: string; // internal use only
  order_code: string;
  order_datetime: string;
  customer_name: string;
  mobile: string;
  address: string;
  status: string;
  delivery_code?: string | null;
};

/* ================= STATUS MAPPER ================= */

const mapAdminToUserStatus = (
  status: string,
  deliveryCode?: string | null
): UserStatus => {
  if (status === "RECEIVED") return "CONFIRMED";
  if (status === "PREPARING") return "PREPARING";
  if (status === "OUT_FOR_DELIVERY")
    return deliveryCode ? "DELIVERY_CODE" : "OUT_FOR_DELIVERY";
  if (status === "DELIVERED") return "DELIVERED";
  return "CANCELLED";
};

/* ================= FORMAT DATE ================= */

const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

export default function TrackOrder() {
  const [orderCode, setOrderCode] = useState("");
  const [order, setOrder] = useState<
    (DbOrder & { userStatus: UserStatus }) | null
  >(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [alreadyDelivered, setAlreadyDelivered] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const [codeInput, setCodeInput] = useState("");

  /* ================= FETCH ORDER ================= */

  const fetchOrder = async () => {
    setError("");
    setSuccess(false);
    setAlreadyDelivered(false);
    setCancelled(false);
    setOrder(null);

    const value = orderCode.trim();

    if (!value) {
      setError("Please enter a valid Order Id");
      return;
    }

    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("order_code", value)
      .maybeSingle();

    // WRONG ORDER CODE
    if (!data) {
      setError("Invalid order Id. Please check and try again.");
      return;
    }

    const userStatus = mapAdminToUserStatus(data.status, data.delivery_code);

    // CANCELLED ORDER
    if (userStatus === "CANCELLED") {
      setCancelled(true);
      return;
    }

    // ALREADY DELIVERED
    if (userStatus === "DELIVERED") {
      setAlreadyDelivered(true);
      return;
    }

    // NORMAL FLOW
    setOrder({
      ...data,
      userStatus,
    });
  };

  /* ================= REALTIME ================= */

  useEffect(() => {
    if (!orderCode) return;

    const channel = supabase
      .channel("order-tracking-realtime")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
        },
        (payload) => {
          const updated = payload.new as DbOrder;

          if (updated.order_code === orderCode) {
            setOrder({
              ...updated,
              userStatus: mapAdminToUserStatus(
                updated.status,
                updated.delivery_code
              ),
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [orderCode]);

  /* ================= VERIFY DELIVERY CODE ================= */

  const verifyCode = async () => {
    if (!order || !order.delivery_code) return;

    if (codeInput.trim() !== order.delivery_code) {
      setError("Invalid delivery code");
      return;
    }

    await supabase
      .from("orders")
      .update({ status: "DELIVERED" })
      .eq("id", order.id);

    setOrder({
      ...order,
      status: "DELIVERED",
      userStatus: "DELIVERED",
    });

    setCodeInput("");
    setError("");
    setSuccess(true);
  };

  /* ================= UI ================= */

  return (
    <div className="rounded-2xl border border-white/10 bg-black/70 p-6 md:p-8 space-y-6 text-white">
      <header className="space-y-1">
        <span className="text-[11px] tracking-[0.3em] uppercase text-orange-400">
          Order Tracking
        </span>
        <h2 className="text-xl md:text-2xl font-semibold">Track Your Order</h2>
        <p className="text-sm text-gray-400">
          Live status updates in real time
        </p>
      </header>

      {/* INPUT */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <PackageSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            value={orderCode}
            onChange={(e) => setOrderCode(e.target.value)}
            placeholder="Enter Order Id (e.g. ORD123456)"
            className="w-full rounded-md bg-black border border-white/20 pl-10 pr-4 py-2 text-sm outline-none focus:border-orange-500"
          />
        </div>

        <button
          onClick={fetchOrder}
          className="rounded-md bg-orange-600 px-6 py-2 text-sm font-medium hover:bg-orange-700"
        >
          Track
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="flex items-center gap-2 rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-400">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {/* FIRST-TIME SUCCESS */}
      {success && (
        <div className="flex items-center gap-2 rounded-md border border-green-500/40 bg-green-500/10 p-3 text-green-400 text-sm">
          <CheckCircle className="h-4 w-4" />
          Order completed successfully. Thank you!
        </div>
      )}

      {/* ALREADY DELIVERED */}
      {alreadyDelivered && (
        <div className="flex items-center gap-2 rounded-md border border-green-500/40 bg-green-500/10 p-3 text-green-400 text-sm">
          <CheckCircle className="h-4 w-4" />
          Order has already been delivered.
        </div>
      )}

      {/* CANCELLED */}
      {cancelled && (
        <div className="flex items-center gap-2 rounded-md border border-red-500/40 bg-red-500/10 p-3 text-red-400 text-sm">
          <XCircle className="h-4 w-4" />
          Your order has been cancelled by the kitchen.
        </div>
      )}

      {order && !alreadyDelivered && !cancelled && (
        <div className="space-y-6 pt-4">
          {/* CUSTOMER CARD */}
          <div className="rounded-xl border border-white/10 bg-black/60 p-4 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-500" />
              {formatDateTime(order.order_datetime)}
            </div>

            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-orange-500" />
              {order.customer_name}
            </div>

            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-orange-500" />
              {order.mobile}
            </div>

            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-orange-500 mt-0.5" />
              {order.address}
            </div>
          </div>

          <OrderStatusTimeline status={order.userStatus} />

          {/* DELIVERY CODE */}
          {order.userStatus === "DELIVERY_CODE" && order.delivery_code && (
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-[220px]">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  placeholder="Delivery code"
                  className="w-full rounded-md bg-black border border-white/20 pl-9 pr-3 py-2 text-sm outline-none focus:border-green-500"
                />
              </div>

              <button
                onClick={verifyCode}
                className="rounded-md bg-green-600 px-5 py-2 text-sm font-medium hover:bg-green-700"
              >
                Confirm
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
