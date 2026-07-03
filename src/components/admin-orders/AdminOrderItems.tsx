import { ShoppingBag } from "lucide-react";
import { AdminOrderItem } from "@/types/admin-order";

export default function AdminOrderItems({
  items,
}: {
  items: AdminOrderItem[];
}) {
  return (
    <div>
      {/* HEADER */}
      <div className="mb-5 flex items-center gap-3">
        <ShoppingBag className="h-5 w-5 text-amber-400" />

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-amber-500">
            Order Items
          </p>

          <p className="text-xs text-stone-500">
            {items.length} Item{items.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* ITEMS */}
      <div className="divide-y divide-stone-800">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between py-4">
            {/* LEFT */}
            <div>
              <p className="text-sm font-medium text-white">{item.name}</p>

              <p className="mt-1 text-xs uppercase tracking-wide text-stone-500">
                Qty {item.qty}
                {item.portion && <span className="ml-2">• {item.portion}</span>}
              </p>
            </div>

            {/* RIGHT */}
            <p className="text-lg font-bold text-amber-400">₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
