import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Portion, MenuItemUI } from "@/app/order-online/page";

type Props = {
  menu: MenuItemUI[];
  activeTab: "Indian" | "Chinese" | "Tandoor";
  onAdd: (item: MenuItemUI, portion: Portion) => void;
};

export default function MenuList({ menu, activeTab, onAdd }: Props) {
  const items = menu.filter((m) => m.category === activeTab);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <p className="text-[11px] tracking-[0.5em] uppercase text-amber-500">
          Menu
        </p>
        <h2 className="mt-2 text-4xl font-serif font-bold text-white">
          {activeTab} Specials
        </h2>
        <p className="mt-2 text-sm text-stone-400">
          Freshly prepared with premium ingredients.
        </p>
      </div>

      <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.name}
            className="group overflow-hidden border border-stone-800 bg-stone-950 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/60"
          >
            <div className="relative h-56 overflow-hidden">
              <Image
                src={item.image_url || "/image/landing2.png"}
                alt={item.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <span className="absolute left-4 top-4 border border-amber-500/60 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-amber-400 backdrop-blur">
                {item.category}
              </span>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-400">
                  Freshly prepared in our kitchen with authentic restaurant
                  flavours.
                </p>
              </div>

              <div className="space-y-3">
                {(Object.keys(item.prices) as Portion[]).map((portion) => (
                  <div
                    key={portion}
                    className="flex items-center justify-between border border-stone-800 bg-stone-900/50 p-3"
                  >
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-stone-400">
                        {portion}
                      </p>
                      <p className="mt-1 text-xl font-bold text-amber-400">
                        ₹{item.prices[portion]}
                      </p>
                    </div>

                    <Button
                      onClick={() => onAdd(item, portion)}
                      className="rounded-none bg-amber-500 px-6 text-xs font-bold uppercase tracking-[0.2em] text-black hover:bg-amber-400"
                    >
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
