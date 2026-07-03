export default function AdminOrdersHeader() {
  return (
    <header className="space-y-8">
      <div className="text-center">
        <p className="text-[11px] tracking-[0.5em] uppercase text-amber-500">
          Admin Dashboard
        </p>

        <h1 className="mt-2 font-serif text-4xl font-bold text-white md:text-5xl">
          Active Orders
        </h1>

        <p className="mt-2 text-sm leading-7 text-stone-400">
          Manage orders, kitchen operations and deliveries.
        </p>
      </div>
    </header>
  );
}
