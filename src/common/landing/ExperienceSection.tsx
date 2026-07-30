import React, { useEffect, useRef, useState } from "react";
import {
  TrendingUp,
  Play,
  Star,
  Users,
  Trophy,
  CalendarDays,
  Bell,
  Check,
  Code2,
  Crown,
  User,
} from "lucide-react";

// lightweight scroll-reveal hook — no external deps
function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function RefSideItem({
  icon: Icon,
  label,
  active,
  badge,
  dot,
}: {
  icon: React.ComponentType<any>;
  label: string;
  active?: boolean;
  badge?: string;
  dot?: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[10px] font-medium transition-all duration-300 ${
        active
          ? "bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white shadow-sm"
          : "text-[#6B6B6B] hover:bg-[#F5F1FF] hover:text-[#7C3AED] hover:translate-x-0.5"
      }`}
    >
      {dot ? (
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: dot }}
        />
      ) : (
        <Icon className="h-3 w-3" />
      )}
      <span className="flex-1 truncate">{label}</span>
      {badge && (
        <span className="rounded-full bg-[#F26B3A] px-1.5 text-[8px] font-semibold text-white">
          {badge}
        </span>
      )}
    </div>
  );
}

function ContinueMini({
  tone,
  track,
  title,
  pct,
  done,
  total,
}: {
  tone: "violet" | "orange";
  track: string;
  title: string;
  pct: number;
  done: number;
  total: number;
}) {
  const grad =
    tone === "violet"
      ? "bg-gradient-to-br from-[#7C3AED] via-[#8B5CF6] to-[#7C3AED]"
      : "bg-gradient-to-br from-[#F26B3A] via-[#F9A66C] to-[#F26B3A]";
  return (
    <div
      className={`overflow-hidden rounded-xl ${grad} p-3 text-white shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="text-[8px] font-medium uppercase tracking-wider text-white/80">
            {track}
          </div>
          <div className="mt-0.5 truncate text-[11px] font-semibold">
            {title}
          </div>
        </div>
        <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/20">
          <Play className="h-3 w-3 fill-white" />
        </div>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/25">
        <div
          className="h-full rounded-full bg-white transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-1 flex items-center justify-between text-[8px] text-white/90">
        <span>
          {done}/{total} lessons
        </span>
        <span>{pct}%</span>
      </div>
    </div>
  );
}

function RecMini({
  title,
  author,
  rating,
}: {
  title: string;
  author: string;
  rating: string;
}) {
  return (
    <div className="group overflow-hidden rounded-xl border border-black/5 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#7C3AED]/30 hover:shadow-md">
      <div className="relative aspect-video bg-gradient-to-br from-[#F5F1FF] via-[#FEF3E8] to-[#EAF4FF]">
        <div className="absolute left-2 top-2 rounded-full bg-[#7C3AED] px-1.5 py-0.5 text-[8px] font-semibold text-white">
          New
        </div>
        <div className="absolute inset-0 grid place-items-center">
          <div className="grid h-7 w-7 place-items-center rounded-full bg-white/90 text-[#7C3AED] shadow transition-transform duration-300 group-hover:scale-110">
            <Play className="h-3 w-3 fill-current" />
          </div>
        </div>
      </div>
      <div className="p-2">
        <div className="line-clamp-1 text-[10px] font-semibold text-[#1A1A1A]">
          {title}
        </div>
        <div className="text-[8px] text-[#8A8A8A]">{author}</div>
        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center gap-0.5 text-[8px] text-[#6B6B6B]">
            <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />{" "}
            {rating}
          </div>
          <span className="text-[9px] font-semibold text-[#7C3AED]">Free</span>
        </div>
      </div>
    </div>
  );
}

function MicroStat({
  icon,
  value,
  label,
}: {
  icon: string;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5 py-0.5">
      <div className="text-[10px]">{icon}</div>
      <div className="font-display text-[11px] font-semibold text-[#1A1A1A] leading-none">
        {value}
      </div>
      <div className="text-[7px] uppercase tracking-wider text-[#8A8A8A]">
        {label}
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  tone = "violet",
  icon,
}: {
  label: string;
  value: string;
  tone?: "violet" | "orange" | "sky";
  icon?: "flame";
}) {
  const tones = {
    violet: {
      bg: "bg-[#F5F1FF]",
      text: "text-[#7C3AED]",
      border: "border-[#7C3AED]/15",
    },
    orange: {
      bg: "bg-[#F3EEFF]",
      text: "text-[#7C3AED]",
      border: "border-[#7C3AED]/15",
    },
    sky: {
      bg: "bg-[#EAF4FF]",
      text: "text-[#2563EB]",
      border: "border-[#2563EB]/15",
    },
  }[tone];
  return (
    <div
      className={`rounded-xl border ${tones.border} ${tones.bg} p-2.5 transition-transform duration-300 hover:-translate-y-0.5`}
    >
      <div className="text-[9px] font-medium text-[#6B6B6B]">{label}</div>
      <div className="mt-0.5 flex items-center gap-1 font-display text-base font-bold text-[#1A1A1A]">
        {value}
        {icon === "flame" ? (
          <span className={tones.text}>🔥</span>
        ) : (
          <TrendingUp className={`h-3 w-3 ${tones.text}`} />
        )}
      </div>
    </div>
  );
}

function FeatureTile({
  icon: Icon,
  title,
  desc,
  delay = 0,
}: {
  icon: React.ComponentType<any>;
  title: string;
  desc: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
      className={`group rounded-2xl border border-black/5 bg-white p-6 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#7C3AED]/30 hover:bg-[#7C3AED] hover:shadow-lg hover:shadow-[#7C3AED]/20 ${
        inView
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6"
      }`}
    >
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#7C3AED]/10 text-[#7C3AED] transition-colors duration-500 group-hover:bg-white/20 group-hover:text-white">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 font-display text-base font-semibold text-[#1A1A1A] transition-colors duration-500 group-hover:text-white">
        {title}
      </h3>
      <p className="mt-1.5 text-sm text-[#6B6B6B] transition-colors duration-500 group-hover:text-white/85">
        {desc}
      </p>
    </div>
  );
}

function ExperienceSection() {
  const { ref: headRef, inView: headInView } = useInView<HTMLDivElement>(0.4);
  const { ref: dashRef, inView: dashInView } = useInView<HTMLDivElement>(0.15);

  return (
    <section className="w-full px-4 py-20 md:px-6 md:py-25">
      <div className="mx-auto w-full max-w-7xl">
        <div
          ref={headRef}
          className={`mb-6 transition-all duration-700 ease-out ${
            headInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-sm font-semibold text-[#7C3AED] uppercase">
              Experience
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-[#111] md:text-4xl lg:text-[44px]">
              Experience Learning Like Never Before
            </h2>
            <p className="mt-3 text-sm md:text-base text-[#6B6B6B]">
              Stay motivated, track your progress, and connect with a community
              — all in one seamless platform.
            </p>
          </div>
        </div>
        {/* Dashboard mock + feature tiles in one row (matches reference) */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <div
            ref={dashRef}
            className={`rounded-2xl border border-black/5 bg-white overflow-hidden p-0 transition-all duration-700 ease-out hover:shadow-xl hover:border-[#7C3AED]/20 ${
              dashInView
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-8 scale-[0.98]"
            }`}
          >
            <div className="flex min-h-[520px] bg-white">
              {/* SIDEBAR */}
              <aside className="hidden w-[180px] shrink-0 flex-col justify-between border-r border-black/5 bg-white p-3 md:flex lg:w-[200px] lg:p-4">
                <div>
                  <div className="flex items-center gap-2 px-1 pb-5">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#A78BFA] text-sm font-bold text-white shadow-sm">
                      CP
                    </div>
                    <div className="min-w-0">
                      <div className="truncate font-display text-[13px] font-semibold text-[#1A1A1A]">
                        CodePath
                      </div>
                      <div className="text-[8px] uppercase tracking-wider text-[#8A8A8A]">
                        Learner portal
                      </div>
                    </div>
                  </div>

                  <div className="mb-2 px-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#B5B0A6]">
                    Learn
                  </div>
                  <nav className="space-y-1">
                    <RefSideItem icon={TrendingUp} label="Dashboard" active />
                    <RefSideItem icon={Play} label="Modules" />
                    <RefSideItem icon={Code2} label="Codeground" />
                    <RefSideItem icon={Check} label="Quizzes" />
                    <RefSideItem icon={Users} label="Find mentors" />
                    <RefSideItem icon={CalendarDays} label="Book a session" />
                    <RefSideItem icon={Bell} label="Messages" badge="3" />
                  </nav>

                  <div className="mb-2 mt-5 px-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#B5B0A6]">
                    Account
                  </div>
                  <nav className="space-y-1">
                    <RefSideItem icon={Crown} label="Premium" />
                    <RefSideItem icon={User} label="Profile" />
                  </nav>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-black/5 bg-[#FBFAF7] p-2">
                  <div className="grid h-7 w-7 place-items-center rounded-full bg-[#7C3AED] text-[9px] font-semibold text-white">
                    JD
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-[10px] font-semibold text-[#1A1A1A]">
                      John Doe
                    </div>
                    <div className="truncate text-[8px] text-[#8A8A8A]">
                      Pro learner
                    </div>
                  </div>
                </div>
              </aside>

              {/* MAIN */}
              <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4 lg:p-5">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="truncate font-display text-base font-semibold text-[#1A1A1A] sm:text-lg">
                      Hey, John 👋
                    </div>
                    <div className="truncate text-[10px] text-[#8A8A8A]">
                      Here's what's happening with your learning today
                    </div>
                  </div>
                  <div className="hidden shrink-0 items-center gap-2 sm:flex">
                    <button className="grid h-8 w-8 place-items-center rounded-full bg-[#F5F1FF] transition-colors duration-300 hover:bg-[#7C3AED] hover:[&>svg]:text-white">
                      <Bell className="h-3.5 w-3.5 text-[#7C3AED] transition-colors duration-300" />
                    </button>
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#A78BFA] text-[10px] font-semibold text-white">
                      JD
                    </div>
                  </div>
                </div>

                {/* Top stats */}
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                  <div className="rounded-2xl border border-black/5 bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#7C3AED]/25 hover:shadow-md">
                    <div className="flex items-center justify-between text-[10px] text-[#8A8A8A]">
                      <span>Avg quiz score</span>
                      <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-600">
                        +8%
                      </span>
                    </div>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="font-display text-xl font-bold text-[#1A1A1A] sm:text-2xl">
                        92.5
                      </span>
                      <span className="text-[10px] text-[#8A8A8A]">/100</span>
                    </div>
                    <div className="mt-2.5 space-y-1.5">
                      <div className="flex items-center justify-between text-[9px] text-[#8A8A8A]">
                        <span>Highest score</span>
                        <span className="font-semibold text-[#1A1A1A]">98</span>
                      </div>
                      <div className="flex h-1.5 gap-0.5">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-full transition-colors duration-500"
                            style={{
                              background: i < 18 ? "#7C3AED" : "#EFEBF7",
                            }}
                          />
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-[9px] text-[#8A8A8A]">
                        <span>Lowest score</span>
                        <span className="font-semibold text-[#1A1A1A]">84</span>
                      </div>
                      <div className="flex h-1.5 gap-0.5">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-full transition-colors duration-500"
                            style={{
                              background: i < 15 ? "#38BDF8" : "#EFEBF7",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-black/5 bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#7C3AED]/25 hover:shadow-md">
                    <div className="flex items-center justify-between text-[10px] text-[#8A8A8A]">
                      <span>Total watch time</span>
                      <span className="rounded-full bg-[#F5F1FF] px-1.5 py-0.5 text-[9px] text-[#7C3AED]">
                        Avg 6h 08m
                      </span>
                    </div>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="font-display text-xl font-bold text-[#1A1A1A] sm:text-2xl">
                        8
                      </span>
                      <span className="text-[11px] font-semibold text-[#1A1A1A]">
                        hr
                      </span>
                      <span className="ml-1 font-display text-xl font-bold text-[#1A1A1A] sm:text-2xl">
                        12
                      </span>
                      <span className="text-[11px] font-semibold text-[#1A1A1A]">
                        min
                      </span>
                    </div>
                    <div className="mt-2.5 flex h-12 items-end gap-1">
                      {[45, 70, 55, 88, 40, 62, 30, 75, 50, 92, 48, 66].map(
                        (h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-t transition-all duration-300 hover:opacity-80"
                            style={{
                              height: `${h}%`,
                              background:
                                i === 3 || i === 9 ? "#7C3AED" : "#D9CDF5",
                            }}
                          />
                        ),
                      )}
                    </div>
                  </div>
                </div>

                {/* Middle row */}
                <div className="mt-2.5 grid gap-2.5 sm:mt-3 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] sm:gap-3">
                  <div className="rounded-2xl border border-black/5 bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#7C3AED]/25 hover:shadow-md">
                    <div className="text-[10px] font-semibold text-[#1A1A1A]">
                      Continue Learning
                    </div>
                    <div className="mt-2 rounded-xl border border-black/5 bg-[#FBFAF7] p-2.5">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[9px] font-medium text-[#7C3AED] ring-1 ring-[#7C3AED]/20">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />{" "}
                          Frontend
                        </span>
                        <span className="text-[10px] text-[#8A8A8A]">···</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#7C3AED]/10 text-[#7C3AED]">
                          <Play className="h-3.5 w-3.5 fill-[#7C3AED]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[11px] font-semibold text-[#1A1A1A]">
                            React · Suspense & Streaming
                          </div>
                          <div className="text-[9px] text-[#8A8A8A]">
                            ⏱ 4hr 12 min
                          </div>
                        </div>
                        <div className="hidden shrink-0 items-center gap-1.5 lg:flex">
                          <div className="grid h-7 w-7 place-items-center rounded-full bg-[#F26B3A] text-[9px] font-semibold text-white ring-2 ring-white">
                            NM
                          </div>
                          <div className="min-w-0">
                            <div className="text-[10px] font-semibold text-[#1A1A1A]">
                              Niki M.
                            </div>
                            <div className="text-[8px] text-[#8A8A8A]">
                              Mentor
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-3 text-[9px] text-[#8A8A8A]">
                        <span>💬 12</span>
                        <span className="text-amber-500">⭐ 4.6</span>
                        <span>👤 2,162</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-black/5 bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#7C3AED]/25 hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] font-semibold text-[#1A1A1A]">
                        Daily Quiz
                      </div>
                      <div className="flex -space-x-1.5">
                        {["#7C3AED", "#F26B3A", "#38BDF8"].map((c) => (
                          <div
                            key={c}
                            className="h-4 w-4 rounded-full ring-2 ring-white"
                            style={{ background: c }}
                          />
                        ))}
                        <span className="ml-1 text-[8px] text-[#8A8A8A]">
                          +4
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="font-display text-xl font-bold text-[#1A1A1A] sm:text-2xl">
                        15
                      </span>
                      <span className="text-[10px] text-[#8A8A8A]">/ 20</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[9px]">
                      <span className="rounded-full bg-[#F5F1FF] px-2 py-0.5 font-semibold text-[#7C3AED]">
                        60 XP
                      </span>
                      <span className="text-[#8A8A8A]">Rank #21</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#EFEBF7]">
                      <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] transition-all duration-700 ease-out" />
                    </div>
                  </div>
                </div>

                {/* Bottom row */}
                <div className="mt-2.5 grid gap-2.5 sm:mt-3 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] sm:gap-3">
                  <div className="rounded-2xl border border-black/5 bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#7C3AED]/25 hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] font-semibold text-[#1A1A1A]">
                        Global Ranking
                      </div>
                      <div className="flex items-center gap-1 rounded-full bg-[#F5F1FF] p-0.5 text-[9px]">
                        <span className="rounded-full bg-white px-2 py-0.5 font-semibold text-[#7C3AED] shadow-sm">
                          Weekly
                        </span>
                        <span className="px-2 py-0.5 text-[#8A8A8A]">
                          All Time
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="font-display text-xl font-bold text-[#7C3AED] sm:text-2xl">
                        #8
                      </span>
                      <span className="text-[10px] text-[#8A8A8A]">
                        of 42 learners
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2 rounded-lg bg-[#FBFAF7] p-1.5">
                      <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#A78BFA] text-[9px] font-semibold text-white">
                        JD
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[10px] font-semibold text-[#1A1A1A]">
                          John Doe
                        </div>
                        <div className="text-[8px] text-amber-600">
                          ⭐ 876 pts
                        </div>
                      </div>
                      <span className="shrink-0 text-[9px] font-semibold text-[#8A8A8A]">
                        #8
                      </span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-black/5 bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#7C3AED]/25 hover:shadow-md">
                    <div className="text-[10px] font-semibold text-[#1A1A1A]">
                      My Courses
                    </div>
                    <div className="mt-2 space-y-1.5">
                      {[
                        { c: "#7C3AED", t: "React Hooks" },
                        { c: "#F26B3A", t: "Python for AI" },
                        { c: "#38BDF8", t: "Node.js API" },
                      ].map((r) => (
                        <div
                          key={r.t}
                          className="flex items-center gap-2 rounded-lg bg-[#FBFAF7] p-1.5 transition-colors duration-300 hover:bg-[#F5F1FF]"
                        >
                          <div
                            className="h-6 w-6 shrink-0 rounded-md"
                            style={{ background: r.c }}
                          />
                          <span className="truncate text-[10px] text-[#1A1A1A]">
                            {r.t}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature tiles beside dashboard */}
          <div className="grid gap-4 sm:grid-cols-2">
            <FeatureTile
              icon={TrendingUp}
              title="We're Insightful"
              desc="Real-time insights to track your progress and growth."
              delay={0}
            />
            <FeatureTile
              icon={Trophy}
              title="We're Engaging"
              desc="Gamified quizzes and badges keep you motivated."
              delay={100}
            />
            <FeatureTile
              icon={Users}
              title="We're Collaborative"
              desc="Join study groups and grow with like-minded peers."
              delay={200}
            />
            <FeatureTile
              icon={CalendarDays}
              title="We're Organized"
              desc="Smart scheduling and deadline reminders."
              delay={300}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;