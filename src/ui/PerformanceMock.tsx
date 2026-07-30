 import { Bell,Sparkles,GitBranch } from "lucide-react";

function PerformanceMock() {
    const days = [
    { d: "Sun", n: 7 },
    { d: "Mon", n: 8 },
    { d: "Tue", n: 9, active: true },
    { d: "Wed", n: 10 },
    { d: "Thu", n: 11 },
    { d: "Fri", n: 12 },
  ];
  return (
   <div className="relative">
      <div className="absolute -top-2 -left-2 z-10 rounded-xl border border-black/5 bg-white px-3 py-2 shadow-lg">
        <div className="text-[10px] text-[#8A8A8A]">Total time spent</div>
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-bold text-[#1A1A1A]">8<span className="text-[10px] font-medium text-[#8A8A8A]">hr</span> 12<span className="text-[10px] font-medium text-[#8A8A8A]">min</span></span>
          <span className="ml-1 text-[10px] font-semibold text-emerald-600">+10% ▲</span>
        </div>
      </div>

      <div className="rounded-2xl border border-black/5 bg-white p-4 pt-10 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="font-display text-sm font-semibold text-[#1A1A1A]">Upcoming deadlines</div>
          <div className="grid h-7 w-7 place-items-center rounded-full bg-[#F3EEFF] text-[#7C3AED]">
            <Bell className="h-3.5 w-3.5" />
          </div>
        </div>

        <div className="mt-3 grid grid-cols-6 gap-1 text-center">
          {days.map((x) => (
            <div key={x.d} className="flex flex-col items-center gap-1">
              <span className="text-[9px] text-[#8A8A8A]">{x.d}</span>
              <span
                className={`grid h-8 w-8 place-items-center rounded-full text-[11px] font-semibold ${
                  x.active
                    ? "bg-[#7C3AED] text-white shadow"
                    : x.d === "Thu"
                      ? "text-[#F59E0B]"
                      : "text-[#1A1A1A]"
                }`}
              >
                {x.n}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-xl border border-black/5 bg-white px-3 py-2">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-[#F3F0FF] text-[#7C3AED]">
            <GitBranch className="h-3.5 w-3.5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[11px] font-semibold text-[#1A1A1A]">Designyow dashboard</div>
            <div className="text-[9px] text-[#8A8A8A]">Due: 10 Feb · 09:00 PM</div>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-2 rounded-xl bg-[#FAF9F5] px-3 py-2">
          <div className="grid h-6 w-6 place-items-center rounded-md bg-[#F3EEFF] text-[#7C3AED]">
            <Sparkles className="h-3 w-3" />
          </div>
          <div className="text-[11px] font-medium text-[#1A1A1A]">Fix the Vertex color</div>
        </div>
      </div>
    </div>
  )
}

export default PerformanceMock