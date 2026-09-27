import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  Star,
  BookOpen,
  Code2,
  Sparkles,
  
  Zap,
  GraduationCap,
} from "lucide-react";
import logo from "../../assets/LOGO.png"
import hero1  from "../../assets/hero1.jpg"
import hero2  from "../../assets/hero2.jpg"
import hero3  from "../../assets/hero3.jpg"
import type { ReactNode } from "react";


// function PhotoTile({
//   className = "",
//   imgHeight,
//   imgTop,
//   imgWidth = "293%",
//   imgLeft = "-100%",
//   children,
//   overlay = false,
// }: {
//   className?: string;
//   imgHeight: string;
//   imgTop: string;
//   imgWidth?: string;
//   imgLeft?: string;
//   children?: ReactNode;
//   overlay?: boolean;
// }) {
//   return (
//     <div className={`relative overflow-hidden  ${className}`}>
//       <img
//         src={landingImg}
//         alt="Student with laptop and notebook"
//         width={1024}
//         height={1280}
//         className="absolute max-w-none object-cover object-top"
//         style={{ height: imgHeight, top: imgTop, width: imgWidth, left: imgLeft }}
//       />
//       {children && (
//         <>
//           {overlay && (
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
//           )}
//           <div className="relative z-10 h-full">{children}</div>
//         </>
//       )}
//     </div>
//   );
// }

function HeroImageCard() {
  return (
      <div className="relative w-full  md:pb-10 lg:pb-6">
      <div className="relative grid h-[440px] grid-cols-6 grid-rows-6 gap-3 sm:h-[540px] sm:gap-4 lg:h-[620px]">
        {/* Main image card */}
        <div className="group relative col-span-4 row-span-4 overflow-hidden rounded-[26px] bg-white shadow-[0_28px_60px_-28px_rgba(28,21,38,0.4)] ring-1 ring-black/[0.06] transition-transform duration-500 hover:-translate-y-1.5 sm:rounded-[30px]">
          <img
            src={hero1}
            alt="Students collaborating around laptops in a modern tech workspace"
            width={1024}
            height={1024}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1526]/35 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl border border-white/25 bg-white/85 px-3.5 py-2 shadow-sm backdrop-blur-md">
            <Zap className="h-3.5 w-3.5 text-[#7C3AED]" />
            <span className="text-xs font-semibold text-[#1C1526] sm:text-sm">
              Hands-on projects
            </span>
          </div>
        </div>

        {/* Secondary floating image card */}
        <div className="group relative z-10 col-span-2 col-start-5 row-span-3 row-start-2 overflow-hidden rounded-[26px] bg-white shadow-[0_22px_48px_-22px_rgba(28,21,38,0.4)] ring-1 ring-black/[0.06] transition-transform duration-500 hover:-translate-y-1.5 sm:rounded-[28px] lg:translate-y-6">
          <img
            src={hero2}
            alt="Developer writing code on a laptop"
            width={1024}
            height={1024}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1526]/45 via-transparent to-transparent" />
          <span className="absolute bottom-3 left-3 rounded-lg bg-white/85 px-2.5 py-1.5 text-[10px] font-semibold text-[#1C1526] backdrop-blur-md sm:text-xs">
            Live coding
          </span>
        </div>

        {/* Rotated topic tile */}
        <div className="col-span-2 col-start-1 row-start-5 flex -rotate-2 items-center justify-center rounded-[20px] bg-[#7C3AED] p-3 shadow-[0_18px_36px_-16px_rgba(124,58,237,0.7)] transition-transform duration-300 hover:rotate-0 sm:rounded-[22px]">
          <span className="text-center font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white sm:text-xs">
            React · Python · SQL
          </span>
        </div>

        {/* Portrait card */}
        <div className="group relative col-span-3 col-start-3 row-span-2 row-start-5 -translate-y-3 overflow-hidden rounded-[26px] bg-white shadow-[0_22px_48px_-22px_rgba(28,21,38,0.35)] ring-1 ring-black/[0.06] transition-transform duration-500 hover:-translate-y-5 sm:rounded-[28px]">
          <img
            src={hero3}
            alt="Smiling software engineer in a bright office"
            width={1024}
            height={1024}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1526]/55 via-transparent to-transparent" />
          <span className="absolute bottom-3 left-3 text-xs font-semibold text-white sm:text-sm">
            1:1 Mentorship
          </span>
        </div>

        {/* Dot tile */}
        <div className="col-start-6 row-start-5 absolute  z-20 hidden items-center gap-2 rounded-full border border-white/60 bg-white/90 px-3.5 py-2 shadow-[0_12px_30px_-12px_rgba(28,21,38,0.35)] backdrop-blur-md md:flex">
          <span className="grid h-5 w-5 place-items-center rounded-md bg-[#1C1526]/10">
          <BookOpen className="h-3 w-3 text-[#7C3AED]" />
        </span>
        <span className="text-xs  font-semibold text-[#1C1526]">Docker</span>
        </div>
      </div>

      {/* Floating glass topic chips */}
      <div className="hero-float absolute -top-3 right-2 z-20 hidden items-center gap-2 rounded-full border border-white/60 bg-white/90 px-3.5 py-2 shadow-[0_12px_30px_-12px_rgba(28,21,38,0.35)] backdrop-blur-md sm:flex">
        <span className="grid h-5 w-5 place-items-center rounded-md  bg-[#1C1526]/10">
          <Code2 className="h-3 w-3 text-[#7C3AED]" />
        </span>
        <span className="text-xs font-semibold text-[#1C1526]">React</span>
      </div>
      <div className="hero-float-delay absolute -left-2 bottom-24 z-20 hidden items-center gap-2 rounded-full border border-white/60 bg-white/90 px-3.5 py-2 shadow-[0_12px_30px_-12px_rgba(28,21,38,0.35)] backdrop-blur-md sm:flex">
        <span className="grid h-5 w-5 place-items-center rounded-md bg-[#F26B3A]/10">
          <Sparkles className="h-3 w-3 text-[#F26B3A]" />
        </span>
        <span className="text-xs font-semibold text-[#1C1526]">Python</span>
      </div>
      {/* Orange spark accent */}
      <span
        aria-hidden
        className="absolute right-1 top-4 z-10 text-2xl leading-none text-[#F26B3A] sm:top-2 sm:text-3xl"
      >
        ✦
      </span>
    </div>
  );
}

/* ── Main Hero ── */
function Hero() {
  const [activeHash, setActiveHash] = useState("#home");
  const [idx, setIdx] = useState(3);

  const links = [
    { href: "#home", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#steps", label: "How it works" },
    { href: "#pricing", label: "Pricing" },
    { href: "#contact", label: "Contact" },
  ];

  const slides = [
    "Project-driven course content",
    "Live 1:1 mentor sessions",
    "AI-powered learning assistant",
    "Real-time progress tracking",
    "Certified achievement badges",
  ];

  const prev = () => setIdx((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIdx((i) => (i + 1) % slides.length);

  return (
    <section
      id="home"
      className="relative w-full overflow-x-clip bg-[#FBFAF7] px-4 md:pb-19 pt-6 sm:px-6 sm:pt-8 lg:px-8"
    >
      <div className="relative mx-auto w-full max-w-[1400px]">
        <div className="grid items-center md:gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          {/* ── LEFT:  Image Card ── */}
          <div className=" lg:block">
            <HeroImageCard />
          </div>
  
          {/* ── RIGHT: Content ── */}
          <div className="flex flex-col gap-8 lg:gap-10">
            {/* Nav */}
            <div className="flex w-full items-center justify-end">
              <nav className="hidden items-center gap-8 sm:flex">
                {links.map((link) => {
                  const isActive = activeHash === link.href;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setActiveHash(link.href)}
                      className={`text-sm tracking-tight text-black from-accent-foreground transition-all duration-200 hover:text-[#7C3AED] ${
                        isActive ? "font-bold" : "font-medium"
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </nav>
            </div>
  
            <div className="flex min-w-0 flex-col gap-7 pb-10 lg:gap-9 lg:pt-6">
              {/* Badge */}
              <div className="flex w-fit items-center gap-2 rounded-full border border-violet-100  px-4 py-2 ">
                <span className="flex items-center gap-1 rounded-md bg-[#7C3AED] px-2 py-0.5">
                  <Star className="h-3 w-3 fill-white text-white" />
                  <span className="text-xs font-bold text-white">5.0</span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Students Review
                </span>
              </div>
  
              {/* Heading */}
              <h1 className="font-hero-display  text-[2.6rem] font-bold leading-[1.02] tracking-tight text-[#1C1526] sm:text-6xl lg:text-[4.2rem] xl:text-[4.6rem]">
          <span className="block">Master New Skills.</span>
          <span className="block text-[#7C3AED]">Track Your Progress</span>
        </h1>
  
              <p className="max-w-lg text-base  leading-relaxed text-zinc-500 lg:text-lg">
                Join thousands of learners advancing their careers with
                personalized learning paths and real-time progress tracking.
              </p>
                
                
              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-8">
                <Link
                  to="/register"
                  className="inline-flex items-center rounded-full bg-[#7C3AED]  px-8 py-3 text-base font-bold text-white shadow-xl shadow-violet-200/50 transition hover:bg-[#6D28D9]  group"
                >
                  Start Free
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-x" />
                </Link>
  
                <Link
                  to="/student/dashboard"
                  className="group flex items-center gap-4"
                >
                  <div className="grid h-14 w-14 place-items-center rounded-full border border-violet-200 transition-transform group-hover:scale-110">
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-violet-50 text-[#7C3AED]">
                      <Play className="h-5 w-5 translate-x-0.5 fill-current" />
                    </div>
                  </div>
                  <span className="text-lg font-bold text-zinc-800">
                    Free Course
                  </span>
                </Link>
              </div>
  
              {/* Slider */}
              <div className="mt-2 flex items-center justify-between gap-4 border-t border-zinc-200/60 pt-6">
                <p className="max-w-[180px] text-xs font-bold uppercase leading-relaxed tracking-widest text-zinc-400">
                  {slides[idx]}
                </p>
                <div className="flex items-center gap-6 sm:gap-8">
                  <span className="text-sm font-extrabold font-mono tracking-tighter text-zinc-900">
                    0{idx + 1} / 0{slides.length}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={prev}
                      aria-label="Previous"
                      className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-zinc-200 text-zinc-400 transition-all hover:border-zinc-900 hover:text-zinc-900"
                    >
                      <ArrowRight className="h-5 w-5 rotate-180" />
                    </button>
                    <div className="h-[1.5px] w-10 bg-zinc-200 sm:w-16" />
                    <button
                      type="button"
                      onClick={next}
                      aria-label="Next"
                      className="grid h-11 cursor-pointer w-11 place-items-center rounded-full border border-zinc-200 text-zinc-400 transition-all hover:border-zinc-900 hover:text-zinc-900"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;