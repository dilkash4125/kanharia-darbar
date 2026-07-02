"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import AdminOrderCard from "@/components/admin-orders/AdminOrderCard";
import { AdminOrder } from "@/types/admin-order";

export default function CompletedOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD COMPLETED ORDERS ================= */
  const loadCompletedOrders = async () => {
    setLoading(true);

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
      .eq("status", "DELIVERED")
      // ✅ SORT BY DB ORDER TIME
      .order("order_datetime", { ascending: false });

    if (error) {
      console.error("COMPLETED ORDERS LOAD ERROR:", error);
      setLoading(false);
      return;
    }

    /* ================= DB → UI MAPPING ================= */
    const formatted =
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
        orderDateTime: o.order_datetime, // ✅ VERY IMPORTANT
      })) || [];

    setOrders(formatted);
    setLoading(false);
  };

  /* ================= REALTIME SYNC ================= */
  useEffect(() => {
    loadCompletedOrders();

    const channel = supabase
      .channel("completed-orders-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
        },
        () => {
          loadCompletedOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  /* ================= UI ================= */
  return (
    <div className="px-3 py-4 sm:px-4 sm:py-6 lg:px-6 lg:py-6 space-y-6 text-white">
      {/* HEADER */}
      <div className="space-y-1">
        <span className="text-[11px] tracking-[0.35em] uppercase text-green-400">
          Orders Archive
        </span>
        <h1 className="text-2xl font-semibold tracking-tight">
          Completed Orders
        </h1>
        <p className="text-sm text-gray-400">
          Successfully delivered customer orders
        </p>
      </div>

      {loading && (
        <p className="text-sm text-gray-400">Loading completed orders...</p>
      )}

      {!loading && orders.length === 0 && (
        <p className="text-sm text-gray-400">No completed orders yet.</p>
      )}

      {/* 🔑 SAME FIX AS ADMIN ORDERS */}
      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 xl:grid-cols-2">
        {orders.map((order) => (
          <AdminOrderCard
            key={order.id}
            order={order}
            onUpdateStatus={() => {}}
          />
        ))}
      </div>
    </div>
  );
}
