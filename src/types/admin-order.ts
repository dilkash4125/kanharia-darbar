/* ================= ORDER ITEMS ================= */

export type AdminOrderItem = {
  name: string;
  qty: number;
  portion?: string | null;
  price: number;
};

/* ================= ORDER STATUS ================= */

export type AdminOrderStatus =
  | "RECEIVED"
  | "PREPARING"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

/* ================= MAIN ORDER (UI MODEL) ================= */

export type AdminOrder = {
  id: string;

  // UI-friendly names
  orderCode: string;
  customerName: string;
  mobile: string;
  address: string;

  total: number;
  status: AdminOrderStatus;
  deliveryCode?: string | null;

  // joined items
  items: AdminOrderItem[];

  // ISO timestamp from DB
  orderDateTime: string;
};
