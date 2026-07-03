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
  deliveryCode?: string | null,
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
                updated.delivery_code,
              ),
            });
          }
        },
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
    <div className="border border-stone-800 bg-stone-950/80 backdrop-blur p-6 md:p-8 space-y-7 text-white">
      {/* HEADER */}
      <header className="space-y-4">
        <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.5em] text-amber-500">
          <span className="block h-px w-7 bg-amber-500/60" />
          Order Tracking
        </p>

        <div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-white">
            Track Your Order
          </h2>

          <p className="mt-2 max-w-lg text-sm leading-7 text-stone-400">
            Check the live preparation and delivery status of your order in real
            time.
          </p>
        </div>
      </header>

      {/* INPUT */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <PackageSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-500" />

          <input
            value={orderCode}
            onChange={(e) => setOrderCode(e.target.value)}
            placeholder="Enter your Order ID"
            className="h-14 w-full border border-stone-800 bg-stone-900/50 pl-11 pr-4 text-sm text-white placeholder:text-stone-600 outline-none transition focus:border-amber-500"
          />
        </div>

        <button
          onClick={fetchOrder}
          className="h-14 whitespace-nowrap bg-amber-500 px-8 text-xs font-bold uppercase tracking-[0.25em] text-black transition hover:bg-amber-400"
        >
          Track Order
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="flex items-center gap-3 border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
          <AlertCircle className="h-5 w-5 shrink-0" />
          {error}
        </div>
      )}

      {/* SUCCESS */}
      {success && (
        <div className="flex items-center gap-3 border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300">
          <CheckCircle className="h-5 w-5 shrink-0" />
          Order completed successfully. Thank you for choosing us.
        </div>
      )}

      {/* DELIVERED */}
      {alreadyDelivered && (
        <div className="flex items-center gap-3 border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300">
          <CheckCircle className="h-5 w-5 shrink-0" />
          Your order has already been delivered.
        </div>
      )}

      {/* CANCELLED */}
      {cancelled && (
        <div className="flex items-center gap-3 border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
          <XCircle className="h-5 w-5 shrink-0" />
          Your order has been cancelled by the kitchen.
        </div>
      )}

      {order && !alreadyDelivered && !cancelled && (
        <div className="space-y-7 border-t border-stone-800 pt-7">
          {/* CUSTOMER CARD */}
          <div className="space-y-4 border border-stone-800 bg-stone-900/50 p-5 text-sm">
            <div className="flex items-center gap-3 text-stone-300">
              <Clock className="h-4 w-4 text-amber-500" />
              {formatDateTime(order.order_datetime)}
            </div>

            <div className="flex items-center gap-3 text-stone-300">
              <User className="h-4 w-4 text-amber-500" />
              {order.customer_name}
            </div>

            <div className="flex items-center gap-3 text-stone-300">
              <Phone className="h-4 w-4 text-amber-500" />
              {order.mobile}
            </div>

            <div className="flex items-start gap-3 text-stone-300">
              <MapPin className="mt-0.5 h-4 w-4 text-amber-500" />
              {order.address}
            </div>
          </div>

          <OrderStatusTimeline status={order.userStatus} />

          {/* DELIVERY CODE */}
          {order.userStatus === "DELIVERY_CODE" && order.delivery_code && (
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-500" />

                <input
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  placeholder="Enter delivery code"
                  className="h-14 w-full border border-stone-800 bg-stone-900/50 pl-11 pr-4 text-sm text-white placeholder:text-stone-600 outline-none transition focus:border-emerald-500"
                />
              </div>

              <button
                onClick={verifyCode}
                className="h-14 whitespace-nowrap bg-emerald-600 px-8 text-xs font-bold uppercase tracking-[0.25em] text-white transition hover:bg-emerald-500"
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
