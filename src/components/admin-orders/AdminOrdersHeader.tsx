import { Inbox, ChefHat, Bike, CheckCircle } from "lucide-react";

type OrderStage = "RECEIVED" | "PREPARING" | "OUT_FOR_DELIVERY" | "COMPLETED";

const stageIconColor: Record<OrderStage, string> = {
  RECEIVED: "text-blue-400",
  PREPARING: "text-orange-400",
  OUT_FOR_DELIVERY: "text-yellow-400",
  COMPLETED: "text-green-400",
};

export default function AdminOrdersHeader() {
  return (
    <header className="space-y-3">
      <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-orange-400/90">
        Admin Panel
      </span>

      <h1 className="text-2xl font-semibold tracking-tight text-white">
        Active Orders
      </h1>

      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
        <span className="font-medium text-gray-300">Order flow</span>

        <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-2.5 py-1">
          <Inbox className={`h-4 w-4 ${stageIconColor.RECEIVED}`} />
          <span>Received</span>
        </div>

        <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-2.5 py-1">
          <ChefHat className={`h-4 w-4 ${stageIconColor.PREPARING}`} />
          <span>Preparing</span>
        </div>

        <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-2.5 py-1">
          <Bike className={`h-4 w-4 ${stageIconColor.OUT_FOR_DELIVERY}`} />
          <span>Out for Delivery</span>
        </div>

        <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-2.5 py-1">
          <CheckCircle className={`h-4 w-4 ${stageIconColor.COMPLETED}`} />
          <span>Order Completed</span>
        </div>
      </div>
    </header>
  );
}
