import { ShoppingBag, X } from "lucide-react";
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

const PIECES_MAP: Record<Portion, number> = {
  Half: 4,
  Full: 8,
};

export default function CartSummary({ cart, total, onRemove }: Props) {
  return (
    <div className="border border-stone-800 bg-stone-950/80 backdrop-blur p-6 lg:p-7 space-y-6">
      {/* HEADER */}
      <div className="space-y-3">
        <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.5em] text-amber-500">
          <span className="block h-px w-7 bg-amber-500/60" />
          Order Summary
        </p>

        <div className="flex items-center justify-between">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-white">
            Your Cart
          </h2>

          <div className="flex h-11 w-11 items-center justify-center border border-stone-800 bg-stone-900">
            <ShoppingBag className="h-5 w-5 text-amber-400" />
          </div>
        </div>
      </div>

      {/* EMPTY */}
      {cart.length === 0 && (
        <div className="border border-dashed border-stone-800 bg-stone-900/40 py-10 text-center">
          <ShoppingBag className="mx-auto mb-3 h-8 w-8 text-stone-600" />

          <p className="text-sm text-stone-400">Your cart is empty</p>

          <p className="mt-1 text-xs uppercase tracking-[0.25em] text-stone-600">
            Add your favourite dishes
          </p>
        </div>
      )}

      {/* ITEMS */}
      <div className="space-y-4">
        {cart.map((item, index) => (
          <div
            key={`${item.name}-${item.portion}-${index}`}
            className="border border-stone-800 bg-stone-900/40 p-4 transition-all duration-300 hover:border-amber-500/40"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg font-semibold text-white">
                  {item.name}
                </h3>

                <div className="mt-2 flex items-center gap-3 text-xs uppercase tracking-[0.2em]">
                  <span className="border border-stone-700 px-2 py-1 text-stone-300">
                    {item.portion}
                  </span>

                  <span className="text-stone-500">
                    {PIECES_MAP[item.portion]} Pieces
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <span className="text-xl font-bold text-amber-400">
                  ₹{item.price}
                </span>

                <button
                  onClick={() => onRemove(index)}
                  className="border border-stone-700 p-2 text-stone-400 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="border-t border-stone-800 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
              Grand Total
            </p>

            <h3 className="mt-1 font-serif text-3xl font-bold text-amber-400">
              ₹{total}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
