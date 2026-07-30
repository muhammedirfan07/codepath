
function Sponsers() {
    const logos = ["Google", "Udemy", "Khan Academy", "Code Academy", "Cloud Academy", "aapm&r"];
  return (
    <section className="w-full  border-y border-black/5 bg-white/60 py-8 sm:py-10">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
            <p className="text-center text-sm font-semibold tracking-wide text-[#6B6B6B]">We're trusted by </p>
             <div className="relative mt-5 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-white/60 to-transparent sm:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-white/60 to-transparent sm:w-16" />
          <div className="flex w-max animate-marquee hover:paused">
             {
                [...logos,...logos].map((l,i)=>(
                    <span
                key={`${l}-${i}`}
                className="mx-8 flex items-center gap-2 font-display text-xl font-semibold text-[#8A8A8A] grayscale transition hover:text-[#1A1A1A] sm:mx-10 sm:text-2xl"
              >
                {l}
              </span>
                ))
             }
             </div>
          </div>
          </div>
    </section>
  )
}

export default Sponsers