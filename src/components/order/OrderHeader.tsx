export default function OrderHeader() {
  return (
    <div className="space-y-5 text-left">
      {/* Premium Badge */}
      <p className="flex items-center gap-3 text-[10px] md:text-xs font-semibold uppercase tracking-[0.5em] text-amber-500">
        <span className="block h-px w-8 bg-amber-500/60" />
        Online Ordering
      </p>

      {/* Heading */}
      <div className="space-y-2">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-none text-white">
          Order
          <span className="block text-amber-400">Fresh Food</span>
        </h1>

        <span className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
          Kanharia Darbaar Cafe
        </span>
      </div>

      {/* Description */}
      <p className="max-w-xl text-sm md:text-base leading-7 text-stone-400">
        Discover our handcrafted menu prepared with authentic flavours. Select
        your favourite dishes, choose the perfect portion and place your order
        in just a few clicks.
      </p>
    </div>
  );
}
