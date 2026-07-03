export default function MenuTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: "Indian" | "Chinese" | "Tandoor";
  setActiveTab: (tab: "Indian" | "Chinese" | "Tandoor") => void;
}) {
  const tabs = ["Indian", "Chinese", "Tandoor"] as const;

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex w-max items-center gap-3 border-b border-stone-800 pb-4">
        {tabs.map((tab) => {
          const active = activeTab === tab;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap
                border
                px-5 py-2.5
                text-[11px] md:text-xs
                font-semibold
                uppercase
                tracking-[0.25em]
                transition-all
                duration-300

                ${
                  active
                    ? "border-amber-500 bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                    : "border-stone-800 bg-stone-950/60 text-stone-400 hover:border-amber-500 hover:text-white hover:bg-stone-900"
                }
              `}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}
