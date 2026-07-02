import { AdminOrder } from "@/types/admin-order";

export default function AdminOrderCustomer({ order }: { order: AdminOrder }) {
  return (
    <div className="text-sm space-y-1">
      <p>{order.customerName}</p>
      <p>{order.mobile}</p>
      <p className="text-gray-300">{order.address}</p>
    </div>
  );
}
