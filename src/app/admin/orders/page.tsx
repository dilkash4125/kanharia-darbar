"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import AdminOrdersHeader from "@/components/admin-orders/AdminOrdersHeader";
import AdminOrderCard from "@/components/admin-orders/AdminOrderCard";
import { AdminOrder, AdminOrderStatus } from "@/types/admin-order";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);

  /* ================= LOAD ORDERS (FROM SUPABASE) ================= */
  const loadOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        id,
        order_code,
        order_datetime,

        customer_name,
        mobile,
        address,
        total,
        status,
        delivery_code,

        order_items (
          name,
          qty,
          portion,
          price
        )
      `
      )
      .in("status", ["RECEIVED", "PREPARING", "OUT_FOR_DELIVERY", "CANCELLED"])
      // SORT BY OFFICIAL ORDER TIME
      .order("order_datetime", { ascending: false });

    if (error) {
      console.error("ADMIN ORDERS LOAD ERROR:", error);
      return;
    }

    /* ================= DB → UI MAPPING ================= */
    const mapped =
      data?.map((o) => ({
        id: o.id,
        orderCode: o.order_code,
        customerName: o.customer_name,
        mobile: o.mobile,
        address: o.address,
        total: o.total,
        status: o.status,
        deliveryCode: o.delivery_code,
        items: o.order_items ?? [],
        orderDateTime: o.order_datetime, // ✅ DB time
      })) || [];

    setOrders(mapped);
  };

  /* ================= INITIAL LOAD + REALTIME ================= */
  useEffect(() => {
    loadOrders();

    const channel = supabase
      .channel("admin-orders-sync")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
        },
        () => loadOrders()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  /* ================= ADMIN STATUS UPDATE ================= */
  const updateStatus = async (id, next) => {
    const order = orders.find((o) => o.id === id);
    if (!order) return;

    // 🔒 HARD LOCK
    if (
      order.status === "OUT_FOR_DELIVERY" ||
      order.status === "DELIVERED" ||
      order.status === "CANCELLED"
    ) {
      return;
    }

    // ❌ Admin cannot directly mark delivered
    if (next === "DELIVERED") return;

    const payload = { status: next };

    // 🔐 Delivery code generate only once
    if (next === "OUT_FOR_DELIVERY" && !order.deliveryCode) {
      payload.delivery_code = Math.floor(
        1000 + Math.random() * 9000
      ).toString();
    }

    /* ================= OPTIMISTIC UI ================= */
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              status: payload.status,
              deliveryCode: payload.delivery_code ?? o.deliveryCode,
            }
          : o
      )
    );

    await supabase.from("orders").update(payload).eq("id", id);
  };

  /* ================= UI ================= */
  return (
    <div className="p-6 space-y-8 text-white">
      <AdminOrdersHeader />

      {orders.length === 0 && (
        <p className="text-sm text-gray-400">No active orders.</p>
      )}

      {/* 🔑 ONLY FIX: items-start */}
      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 xl:grid-cols-2">
        {orders.map((order) => (
          <AdminOrderCard
            key={order.id}
            order={order}
            onUpdateStatus={updateStatus}
          />
        ))}
      </div>
    </div>
  );
}
