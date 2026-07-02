export default function MenuTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: "Indian" | "Chinese" | "Tandoor";
  setActiveTab: (tab: "Indian" | "Chinese" | "Tandoor") => void;
}) {
  return (
    <div className="flex gap-6 text-sm md:text-base font-medium text-gray-400">
      {["Indian", "Chinese", "Tandoor"].map((tab) => {
        const isActive = activeTab === tab;

        return (
          <span
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`cursor-pointer tracking-wide transition
              ${
                isActive
                  ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                  : "hover:text-white"
              }`}
          >
            {tab}
          </span>
        );
      })}
    </div>
  );
}
