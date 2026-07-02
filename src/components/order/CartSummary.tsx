import { X } from "lucide-react";
import { Portion } from "@/app/order-online/page";

type CartItem = {
  name: string;
  portion: Portion;
  qty: number;
  price: number;
};

type Props = {
  cart: CartItem[];
  total: number;
  onRemove: (index: number) => void;
};

/* ✅ PIECES RULE (UI ONLY) */
const PIECES_MAP: Record<Portion, number> = {
  Half: 4,
  Full: 8,
};

export default function CartSummary({ cart, total, onRemove }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/70 p-6 space-y-6">
      {/* HEADER */}
      <div className="space-y-1">
        <span className="text-[11px] tracking-[0.35em] uppercase text-orange-400">
          Summary
        </span>
        <h2 className="text-xl font-semibold tracking-tight text-white">
          Your Cart
        </h2>
      </div>

      {/* CART ITEMS */}
      <div className="space-y-4">
        {cart.length === 0 && (
          <p className="text-sm text-gray-400">No items added yet</p>
        )}

        {cart.map((item, index) => (
          <div
            key={`${item.name}-${item.portion}-${index}`}
            className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
          >
            <div className="flex items-start justify-between gap-4">
              {/* LEFT */}
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-gray-200 leading-tight">
                  {item.name}
                  <span className="ml-1 text-xs font-normal text-gray-400">
                    ({item.portion})
                  </span>
                </p>

                <p className="text-[11px] tracking-wide text-gray-400">
                  {PIECES_MAP[item.portion]} pieces
                </p>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-100">
                  ₹{item.price}
                </span>

                {/* REMOVE ICON */}
                <button
                  onClick={() => onRemove(index)}
                  className="rounded-md p-1 text-orange-500 hover:text-red-800 hover:bg-white/5 transition"
                  aria-label="Remove item"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="border-t border-white/10 pt-4 flex justify-between items-center">
        <span className="text-sm tracking-wide text-gray-300">
          Total Amount
        </span>
        <span className="text-lg font-semibold text-orange-500">₹{total}</span>
      </div>
    </div>
  );
}
