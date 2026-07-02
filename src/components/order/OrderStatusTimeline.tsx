import {
  CheckCircle,
  CookingPot,
  Bike,
  KeyRound,
  PackageCheck,
  Utensils,
} from "lucide-react";

type Status =
  | "CONFIRMED"
  | "PREPARING"
  | "OUT_FOR_DELIVERY"
  | "DELIVERY_CODE"
  | "DELIVERED";

type StatusTimes = {
  received_at?: string | null;
  preparing_at?: string | null;
  out_for_delivery_at?: string | null;
  delivered_at?: string | null;
};

const STEPS = [
  {
    key: "CONFIRMED",
    title: "Order confirmed",
    subtitle: "We’ve received your order",
    icon: CheckCircle,
    timeKey: "received_at",
  },
  {
    key: "PREPARING",
    title: "Being prepared",
    subtitle: "Kitchen is working on your order",
    icon: CookingPot,
    timeKey: "preparing_at",
  },
  {
    key: "OUT_FOR_DELIVERY",
    title: "On the way",
    subtitle: "Delivery partner is heading to you",
    icon: Bike,
    timeKey: "out_for_delivery_at",
  },
  {
    key: "DELIVERY_CODE",
    title: "Confirm delivery",
    subtitle: "Enter the delivery code to complete",
    icon: KeyRound,
  },
  {
    key: "DELIVERED",
    title: "Delivered",
    subtitle: "Order delivered successfully",
    icon: PackageCheck,
    timeKey: "delivered_at",
  },
] as const;

/* ---------- TIME FORMAT ---------- */
const formatTime = (value?: string | null) => {
  if (!value) return null;

  const d = new Date(value);
  return d.toLocaleString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export default function OrderStatusTimeline({
  status,
  times = {},
}: {
  status: Status;
  times?: StatusTimes;
}) {
  const activeIndex =
    status === "DELIVERY_CODE"
      ? STEPS.findIndex((s) => s.key === "DELIVERY_CODE")
      : STEPS.findIndex((s) => s.key === status);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <p className="text-xs tracking-[0.3em] uppercase text-orange-400">
          Order status
        </p>
        <h3 className="text-sm text-gray-400">Live updates for your order</h3>
      </div>

      {/* TIMELINE */}
      <div className="space-y-5">
        {STEPS.map((step, index) => {
          const isCompleted =
            index < activeIndex && step.key !== "DELIVERY_CODE";

          const isActive = step.key === status;
          const Icon = step.icon;

          const time =
            "timeKey" in step ? formatTime(times[step.timeKey]) : null;

          return (
            <div key={step.key} className="flex gap-4">
              {/* ICON */}
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border
                ${
                  isCompleted
                    ? "border-orange-500 bg-orange-500/10 text-orange-500"
                    : isActive
                    ? "border-orange-500 text-orange-500 ring-2 ring-orange-500/30"
                    : "border-white/20 text-gray-500"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>

              {/* TEXT */}
              <div className="space-y-0.5">
                <p
                  className={`text-sm font-medium ${
                    isCompleted || isActive ? "text-white" : "text-gray-400"
                  }`}
                >
                  {step.title}
                </p>

                <p className="text-xs text-gray-400">{step.subtitle}</p>

                {/* 🕒 TIME */}
                {time && (
                  <p className="text-[11px] text-gray-500 mt-0.5">{time}</p>
                )}

                {/* CURRENT STAGE */}
                {isActive && step.key !== "DELIVERED" && (
                  <span className="inline-block text-[10px] mt-1 tracking-wide text-orange-400">
                    ● Current stage
                  </span>
                )}

                {/* DELIVERY CODE HELP */}
                {status === "DELIVERY_CODE" && step.key === "DELIVERY_CODE" && (
                  <p className="text-xs mt-1 text-gray-400">
                    Ask the delivery partner for the code to confirm delivery.
                  </p>
                )}

                {/* SUCCESS */}
                {isActive && step.key === "DELIVERED" && (
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-orange-400">
                    <Utensils className="h-3.5 w-3.5" />
                    Enjoy your meal
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
