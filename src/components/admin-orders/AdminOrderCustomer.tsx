import { User, Phone, MapPin } from "lucide-react";
import { AdminOrder } from "@/types/admin-order";

export default function AdminOrderCustomer({ order }: { order: AdminOrder }) {
  return (
    <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-5">
      <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-amber-500">
        Customer Details
      </p>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500/10">
            <User className="h-4 w-4 text-amber-400" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-stone-500">
              Customer
            </p>
            <p className="text-sm font-medium text-white">
              {order.customerName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500/10">
            <Phone className="h-4 w-4 text-amber-400" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-stone-500">
              Mobile
            </p>
            <p className="text-sm font-medium text-white">{order.mobile}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500/10">
            <MapPin className="h-4 w-4 text-amber-400" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-stone-500">
              Delivery Address
            </p>
            <p className="text-sm leading-6 text-stone-300">{order.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
