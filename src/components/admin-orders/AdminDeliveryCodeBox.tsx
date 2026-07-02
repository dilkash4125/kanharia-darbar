export default function AdminDeliveryCodeBox({ code }: { code: string }) {
  return (
    <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3">
      {/* Label */}
      <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-green-400/90">
        Delivery Code
      </p>

      {/* Code */}
      <p className="mt-1 text-lg font-semibold tracking-wider text-green-400">
        {code}
      </p>
    </div>
  );
}
