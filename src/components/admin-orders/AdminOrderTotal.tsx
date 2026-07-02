export default function AdminOrderTotal({ total }: { total: number }) {
  return (
    <div className="flex justify-between border-t border-white/10 pt-4">
      <span className="text-sm text-gray-400">Total</span>
      <span className="text-lg font-semibold text-orange-500">₹{total}</span>
    </div>
  );
}
