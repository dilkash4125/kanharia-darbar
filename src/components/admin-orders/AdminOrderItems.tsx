import { AdminOrderItem } from "@/types/admin-order";

export default function AdminOrderItems({
  items,
}: {
  items: AdminOrderItem[];
}) {
  return (
    <div className="mt-2 divide-y divide-white/10">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center justify-between py-3">
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-0.5">
            {/* Item name */}
            <span className="text-sm font-medium text-gray-100 leading-snug">
              {item.name}
            </span>

            {/* Meta info */}
            <span className="text-[11px] tracking-wide text-gray-400">
              Qty {item.qty}
              {item.portion && (
                <span className="ml-1 uppercase">• {item.portion}</span>
              )}
            </span>
          </div>

          {/* RIGHT SIDE */}
          <span className="text-sm font-semibold text-gray-300 tabular-nums">
            ₹{item.price}
          </span>
        </div>
      ))}
    </div>
  );
}
