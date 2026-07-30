import { Code2,Zap,Medal,Trophy } from "lucide-react"

function QuizScoreMock() {
  return (
     <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
      <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#FAF9F5] px-2 py-1">
        <div className="flex -space-x-1">
          {["bg-[#7C3AED]", "bg-[#7C3AED]", "bg-[#2563EB]"].map((c, i) => (
            <div key={i} className={`h-4 w-4 rounded-full border border-white ${c}`} />
          ))}
        </div>
        <span className="text-[9px] font-medium text-[#1A1A1A]">4 friends active now</span>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div className="font-display text-3xl font-bold text-[#1A1A1A]">
            15<span className="text-lg text-[#8A8A8A]">/20</span>
          </div>
          <div className="mt-0.5 flex items-center gap-1 text-[10px] text-[#8A8A8A]">
            <Code2 className="h-3 w-3" /> code quiz
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="rounded-md bg-[#F3EEFF] px-2 py-0.5 text-[9px] font-semibold text-[#7C3AED]">HTML 5 · 10 Q</div>
          <div className="rounded-md bg-[#F3F0FF] px-2 py-0.5 text-[9px] font-semibold text-[#7C3AED]">Java · 6 Q</div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div className="flex items-center gap-1 rounded-full bg-[#FAF9F5] px-2 py-1 text-[10px] font-semibold">
          <Zap className="h-3 w-3 text-[#7C3AED]" /> 60 points
        </div>
        <div className="flex items-center gap-1 rounded-full bg-[#FAF9F5] px-2 py-1 text-[10px] font-semibold">
          <Trophy className="h-3 w-3 text-[#7C3AED]" /> #21 rank
        </div>
        <div className="flex items-center gap-1 rounded-full bg-[#FAF9F5] px-2 py-1 text-[10px] font-semibold">
          <Medal className="h-3 w-3 text-[#F59E0B]" /> Gold
        </div>
      </div>
    </div>
  )
}

export default QuizScoreMock