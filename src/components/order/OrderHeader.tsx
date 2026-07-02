export default function OrderHeader() {
  return (
    <div className="space-y-2 text-left">
      <span className="block text-xs tracking-[0.35em] uppercase text-orange-400 font-medium">
        Online Ordering
      </span>

      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
        Order <span className="text-orange-500">Food</span>
      </h1>

      <p className="max-w-md text-sm md:text-base text-gray-400 leading-relaxed">
        Choose dishes, select portions, complete payment and track your order.
      </p>
    </div>
  );
}
