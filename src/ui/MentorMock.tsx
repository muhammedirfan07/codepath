import { Plus } from "lucide-react";

function MentorMock() {
    const mentors = [
    { initials: "SK", name: "Sara Kim", role: "Senior React Engineer", rate: "$45/hr", bg: "bg-[#7C3AED] text-white", available: true },
    { initials: "AR", name: "Arjun Rao", role: "Full-Stack · Node.js", rate: "$60/hr", bg: "bg-[#7C3AED] text-white", highlight: true, available: true },
    { initials: "MO", name: "Maya Okafor", role: "Python · ML Coach", rate: "$55/hr", bg: "bg-[#2563EB] text-white" },
  ];
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="font-display text-sm font-semibold text-[#1A1A1A]">Find a Mentor</div>
        <button className="grid h-7 w-7 place-items-center rounded-full bg-[#7C3AED] text-white shadow-sm">
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="mt-3 border-t border-black/5 pt-3">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-[10px] font-medium text-[#8A8A8A]">Top rated this week</div>
          <div className="text-[10px] font-semibold text-emerald-600">● Live now</div>
        </div>
        <div className="space-y-2">
          {mentors.map((m) => (
            <div
              key={m.name}
              className={`flex items-center justify-between rounded-xl border px-3 py-2.5 ${
                m.highlight ? "border-black/10 bg-white shadow-md" : "border-black/[0.06] bg-[#FAF9F5]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`grid h-8 w-8 place-items-center rounded-full text-[11px] font-bold ${m.bg}`}>
                  {m.initials}
                </div>
                <div>
                  <div className="text-[12px] font-semibold text-[#1A1A1A]">{m.name}</div>
                  <div className="text-[10px] text-[#8A8A8A]">{m.role}</div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-0.5">
                <span className="text-[11px] font-semibold text-[#1A1A1A]">{m.rate}</span>
                <span className="text-[9px] font-medium text-[#7C3AED]">Book →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MentorMock