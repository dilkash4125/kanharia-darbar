"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import OrderHeader from "@/components/order/OrderHeader";
import MenuTabs from "@/components/order/MenuTabs";
import MenuList from "@/components/order/MenuList";
import CartSummary from "@/components/order/CartSummary";
import UserDetailsAndPayment from "@/components/order/UserDetailsAndPayment";
import OrderConfirmation from "@/components/order/OrderConfirmation";
import TrackOrder from "@/components/order/TrackOrder";

/* ================= TYPES ================= */

export type Portion = "Half" | "Full";

type MenuRow = {
  name: string;
  category: string;
  portion: Portion;
  price: number;
};

type MenuItemUI = {
  name: string;
  category: string;
  prices: {
    Half?: number;
    Full?: number;
  };
};

/* ================= PAGE ================= */

export default function OrderOnlinePage() {
  const [activeTab, setActiveTab] = useState("Indian");
  const [menu, setMenu] = useState<MenuItemUI[]>([]);
  const [cart, setCart] = useState<any[]>([]);

  const [customerName, setCustomerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("");

  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderDateTime, setOrderDateTime] = useState<string>("");
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH MENU FROM DB ================= */

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const { data, error } = await supabase
      .from("menu_items")
      .select("name, category, portion, price");

    if (error || !data) {
      console.error("Menu fetch failed", error);
      return;
    }

    // 🔁 DB rows → UI structure
    const grouped: Record<string, MenuItemUI> = {};

    (data as MenuRow[]).forEach((row) => {
      if (!grouped[row.name]) {
        grouped[row.name] = {
          name: row.name,
          category: row.category,
          prices: {},
        };
      }

      grouped[row.name].prices[row.portion] = row.price;
    });

    setMenu(Object.values(grouped));
  };

  /* ================= CART ACTIONS ================= */

  const addToCart = (item: MenuItemUI, portion: Portion) => {
    const price = item.prices[portion];
    if (!price) return;

    setCart((prev) => [
      ...prev,
      {
        name: item.name,
        portion,
        qty: 1,
        price,
      },
    ]);
  };
  /* Remove cart item by index */
  const removeItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };
  /* ================= TOTAL ================= */

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  /* ================= ORDER CREATE ================= */

  const handlePayment = async () => {
    if (!customerName || !mobile || !location || cart.length === 0) {
      alert("Fill all details");
      return;
    }

    setLoading(true);

    const orderCode = "ORD" + Math.floor(100000 + Math.random() * 900000);

    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        order_code: orderCode,
        customer_name: customerName,
        mobile,
        address: location,
        total: totalAmount,
        status: "RECEIVED",
      })
      .select("id, order_datetime")
      .single();

    if (error || !order) {
      alert("Order failed");
      setLoading(false);
      return;
    }

    const items = cart.map((c) => ({
      order_id: order.id,
      name: c.name,
      portion: c.portion,
      qty: c.qty,
      price: c.price,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(items);

    if (itemsError) {
      alert("Order items failed");
      setLoading(false);
      return;
    }

    setOrderId(orderCode);
    setOrderDateTime(order.order_datetime);
    setPaid(true);
    setLoading(false);
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-black text-white px-4 py-14">
      <div className="mx-auto max-w-6xl space-y-16">
        <OrderHeader />
        <MenuTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {!paid ? (
          <div className="grid md:grid-cols-2 gap-10">
            <MenuList menu={menu} activeTab={activeTab} onAdd={addToCart} />

            <div className="space-y-5">
              <CartSummary
                cart={cart}
                total={totalAmount}
                onRemove={removeItem}
              />

              <UserDetailsAndPayment
                customerName={customerName}
                setCustomerName={setCustomerName}
                mobile={mobile}
                setMobile={setMobile}
                location={location}
                setLocation={setLocation}
                onPay={handlePayment}
                loading={loading}
              />
            </div>
          </div>
        ) : (
          <OrderConfirmation
            customerName={customerName}
            orderId={orderId!}
            orderDateTime={orderDateTime}
          />
        )}

        <div className="pt-10 border-t border-white/10">
          <TrackOrder />
        </div>
      </div>
    </div>
  );
}
