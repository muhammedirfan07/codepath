import { Medal,ChevronRight } from "lucide-react"

function QuizJoinMock() {
  return (
   <div className="relative rounded-2xl border border-black/5 bg-gradient-to-br from-[#F5F1FF] via-white to-[#F3EEFF] p-4 shadow-sm">
      <div className="flex items-center justify-between rounded-xl border border-black/5 bg-white px-3 py-2 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-[#7C3AED] to-[#A78BFA] text-[10px] font-bold text-white shadow-sm">JS</div>
          <div>
            <div className="text-[11px] font-semibold text-[#1A1A1A]">JavaScript Basics</div>
            <div className="text-[9px] text-[#8A8A8A]">10 Q · 10 minutes</div>
          </div>
        </div>
        <ChevronRight className="h-3.5 w-3.5 text-[#7C3AED]" />
      </div>

      <div className="mt-3 rounded-lg border border-[#7C3AED]/25 bg-white px-3 py-2 text-[13px] font-semibold tracking-widest text-[#7C3AED]">
        sQ1j<span className="ml-0.5 inline-block h-3 w-px animate-pulse bg-[#7C3AED] align-middle" />
      </div>
      <div className="mt-1 text-[9px] text-[#8A8A8A]">Enter the 6-digit code from your instructor</div>

      <button className="mt-3 w-full rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#7C3AED] py-2 text-[12px] font-semibold text-white shadow-sm">
        Join the quiz
      </button>

      <div className="absolute -bottom-3 -right-2 flex flex-col items-center rounded-xl border border-black/5 bg-white px-2 py-1.5 shadow-lg">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#A78BFA] text-[10px] font-bold text-white shadow-sm ring-2 ring-[#7C3AED]/30">
          WW
        </div>
        <div className="mt-1 text-[9px] font-semibold text-[#1A1A1A]">Wade Warren</div>
        <div className="text-[8px] font-semibold text-[#7C3AED]">#ranking 1</div>
        <Medal className="mt-0.5 h-3 w-3 text-[#F59E0B]" />
      </div>
    </div>
  )
}

export default QuizJoinMock