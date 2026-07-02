import { Button } from "@/components/ui/button";
import type { Portion, MenuItemUI } from "@/app/order-online/page";

type Props = {
  menu: MenuItemUI[];
  activeTab: "Indian" | "Chinese" | "Tandoor";
  onAdd: (item: MenuItemUI, portion: Portion) => void;
};

export default function MenuList({ menu, activeTab, onAdd }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/70 p-6 space-y-6">
      {/* HEADER */}
      <div className="space-y-1">
        <span className="text-[11px] tracking-[0.3em] uppercase text-orange-400">
          Menu
        </span>
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
          {activeTab} Dishes
        </h2>
        <p className="text-sm text-gray-400">Select portion to add items</p>
      </div>

      {/* ITEMS */}
      {menu
        .filter((m) => m.category === activeTab)
        .map((item) => (
          <div
            key={`${item.name}-${item.category}`}
            className="border-b border-white/10 pb-5 last:border-b-0"
          >
            <p className="text-base font-medium tracking-wide text-white">
              {item.name}
            </p>

            <div className="mt-3 flex flex-wrap gap-3">
              {(Object.keys(item.prices) as Portion[]).map((portion) => (
                <Button
                  key={`${item.name}-${portion}`}
                  variant="outline"
                  size="sm"
                  onClick={() => onAdd(item, portion)}
                  className="
              bg-transparent
              border-white/20
              text-gray-300
              active:bg-white/60
              focus-visible:ring-0
              transition-colors
            "
                >
                  <span className="text-xs tracking-wide">{portion}</span>
                  <span className="ml-2 text-sm font-medium">
                    ₹{item.prices[portion]}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
