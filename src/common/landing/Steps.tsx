import { Sparkles,ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import img1 from '../../assets/001.jpeg'
import img2 from '../../assets/002.png'
import img3 from '../../assets/003.jpeg'
import img4 from '../../assets/004.jpeg'
import { Link } from 'react-router-dom'

function Steps() {
    const data = [
    {
      n: "01",
      title: "Follow a guided step-by-step learning journey designed to take you from beginner to confident learner.",
      bullets: ["Guided learning path", "Real project-based learning", "Completion certificate"],
      badge: "Guided Path",
      image: img1,
    },
    {
      n: "02",
      title: "Book 1:1 live mentor sessions with vetted experts for code reviews and personalized guidance.",
      bullets: ["HD video mentor calls", "Screen share & code review", "Flexible scheduling"],
      badge: "Live Mentors",
      image: img2,
    },
    {
      n: "03",
      title: "Sharpen your skills with real coding challenges, quizzes, and instant AI feedback in your browser.",
      bullets: ["50+ coding problems", "Instant test runner", "AI-powered hints"],
      badge: "Practice",
      image: img3,
    },
    {
      n: "04",
      title: "Earn badges, track streaks, and climb the leaderboard as you complete milestones across every module.",
      bullets: ["Progress dashboard", "Achievement badges", "Global leaderboard"],
      badge: "Rewards",
      image: img4,
    },
  ];
  const [active, setActive] = useState(0);
  const s = data[active];
  const tabsRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const el = tabsRef.current?.querySelector<HTMLElement>(`[data-step-index="${active}"]`);
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 40) return;
    setActive((i) => {
      if (dx < 0) return Math.min(data.length - 1, i + 1);
      return Math.max(0, i - 1);
    });
  };
  return (
   <section id="steps" className="w-full px-4 py-16 sm:px-6 sm:py-20 md:py-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#7C3AED]">
       How it works
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#111] md:text-4xl">
        Effortless Learning Experience
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-[#6B6B6B] md:text-base">
       Unlock your potential with interactive tools, progress tracking, and a supportive community for stress-free learning.
      </p>
    </div>
        <div className="mt-8 grid gap-6 sm:mt-12 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#F5D9C7] via-[#E9B79A] to-[#C48A6C] shadow-xl sm:aspect-[5/4] sm:rounded-3xl md:aspect-[4/3] lg:aspect-auto lg:min-h-[560px]">
            {data.map((step, i) => (
              <img
                key={step.n}
                src={step.image}
                alt={step.badge}
                loading="lazy"
                width={1024}
                height={1024}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {/* Watermark logo */}
            <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 text-white/90 drop-shadow sm:left-6 sm:top-6 sm:gap-2">
              <div className="grid h-5 w-5 place-items-center rounded-md bg-white/25 backdrop-blur sm:h-6 sm:w-6">
                <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </div>
              <span className="font-display text-sm font-semibold tracking-tight sm:text-lg">CodePath</span>
            </div>

            {/* Active step badge */}
            <div className="absolute right-3 top-3 z-10 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[#7C3AED] shadow-md backdrop-blur sm:right-6 sm:top-6 sm:px-3 sm:text-[11px]">
              {s.badge}
            </div>
          </div>

          {/* RIGHT: content */}
          <div
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="flex touch-pan-y select-none flex-col justify-between rounded-2xl bg-white p-5 shadow-sm sm:rounded-3xl sm:p-6 md:p-8"
          >
            <div
              ref={tabsRef}
              role="tablist"
              aria-label="How it works steps"
              className="-mx-1 flex snap-x snap-mandatory items-center gap-4 overflow-x-auto scroll-smooth px-1 pb-1 sm:mx-0 sm:flex-wrap sm:gap-5 sm:overflow-visible sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="hidden h-[2px]  w-8 shrink-0 bg-[#1A1A1A] sm:block" />
              {data.map((step, i) => (
                <button
                  key={step.n}
                  role="tab"
                  aria-selected={i === active}
                  data-step-index={i}
                  onClick={() => setActive(i)}
                  className={`shrink-0 snap-center font-display text-2xl cursor-pointer font-semibold transition sm:text-2xl md:text-3xl ${
                    i === active ? "text-[#1A1A1A]" : "text-[#D4D4D4] hover:text-[#8A8A8A]"
                  }`}
                >
                  {step.n}
                </button>
              ))}
            </div>

            {/* Mobile progress dots + swipe hint */}
            <div className="mt-3 flex items-center justify-between sm:hidden">
              <div className="flex items-center gap-1.5">
                {data.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to step ${i + 1}`}
                    onClick={() => setActive(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === active ? "w-6 bg-[#7C3AED]" : "w-1.5 bg-[#E5E5E5]"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-[#8A8A8A]">Swipe to switch</span>
            </div>

            {/* Description */}
            <h3 className="mt-6 font-display text-lg font-semibold leading-[1.3] text-[#1A1A1A] sm:mt-10 sm:text-2xl sm:leading-[1.25] md:text-[32px] md:leading-[1.2]">
              {s.title}
            </h3>

            {/* Bullets + CTA */}
            <div className="mt-6 flex flex-col gap-5 sm:mt-10 sm:gap-6 md:flex-row md:items-end md:justify-between">
              <ul className="space-y-2.5 sm:space-y-3">
                {s.bullets.map((b, idx) => {
                  const [first, ...rest] = b.split(" ");
                  return (
                    <li key={idx} className="flex items-center gap-2.5 text-sm text-[#1A1A1A] sm:text-[15px]">
                      <Sparkles className="h-4 w-4 flex-shrink-0 fill-[#7C3AED] text-[#7C3AED]" />
                      <span>
                        <span className="font-semibold">{first}</span>{" "}
                        <span className="text-[#6B6B6B]">{rest.join(" ")}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
               <div className="mt-10 flex text-nowrap justify-center">
          <button className="bg-[#7C3AED] text-white shadow-[0_10px_24px_-10px_rgba(124,58,237,0.7)] hover:bg-[#6D28D9] px-8 text-md py-2 rounded-full group">
            <Link
              to="/register"
              className="flex items-center gap-1 whitespace-nowrap"
            >
              Start Free
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-x" />
            </Link>
          </button>
        </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Steps