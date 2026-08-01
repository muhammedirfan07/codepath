import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Error404Page() {
  const navigate = useNavigate()

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white text-[#0B0812]">
      {/* animated grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]" />

      {/* drifting gradient orbs */}
      <div className="absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-[#7C3AED]/30 blur-3xl animate-[drift_9s_ease-in-out_infinite]" />
      <div className="absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-[#4C1D95]/30 blur-3xl animate-[drift_11s_ease-in-out_infinite_reverse]" />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6">
        {/* glitch 404 */}
        <div className="relative select-none">
          <h1 className="text-[9rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-[#7C3AED] sm:text-[11rem]">
            404
          </h1>
          <h1
            aria-hidden
            className="absolute inset-0 text-[9rem] font-black leading-none tracking-tighter text-[#7C3AED]/60 sm:text-[11rem] animate-[glitch_3.5s_infinite]"
          >
            404
          </h1>
        </div>

        <p className="mt-2 text-lg text-gray-500">
          This page drifted off the map.
        </p>

        <button
          onClick={() => navigate('/')}
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#7C3AED] px-8 py-3 text-base font-bold text-white shadow-xl shadow-violet-900/40 transition-all duration-300 hover:bg-[#6D28D9] hover:shadow-violet-500/30 hover:-translate-y-0.5 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-x-1" />
          Back home
        </button>
      </div>

      <style>{`
        @keyframes drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -20px); }
        }
        @keyframes glitch {
          0%, 92%, 100% { clip-path: inset(0 0 0 0); transform: translate(0, 0); opacity: 0; }
          93% { clip-path: inset(20% 0 40% 0); transform: translate(-4px, 2px); opacity: 1; }
          94% { clip-path: inset(60% 0 5% 0); transform: translate(4px, -2px); opacity: 1; }
          95% { clip-path: inset(10% 0 70% 0); transform: translate(-2px, 0); opacity: 1; }
          96% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </div>
  )
}

export default Error404Page