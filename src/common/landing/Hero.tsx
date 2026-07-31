import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  Star,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import logo from "../../assets/LOGO.png"
import landingImg  from "../../assets/landingImg.jpg"
import type { ReactNode } from "react";


function PhotoTile({
  className = "",
  imgHeight,
  imgTop,
  imgWidth = "293%",
  imgLeft = "-100%",
  children,
  overlay = false,
}: {
  className?: string;
  imgHeight: string;
  imgTop: string;
  imgWidth?: string;
  imgLeft?: string;
  children?: ReactNode;
  overlay?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden  ${className}`}>
      <img
        src={landingImg}
        alt="Student with laptop and notebook"
        width={1024}
        height={1280}
        className="absolute max-w-none object-cover object-top"
        style={{ height: imgHeight, top: imgTop, width: imgWidth, left: imgLeft }}
      />
      {children && (
        <>
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          )}
          <div className="relative z-10 h-full">{children}</div>
        </>
      )}
    </div>
  );
}

function HeroImageCard() {
  return (
    <div className="relative w-full overflow-hidden rounded-[32px]  aspect-4/5 sm:aspect-5/6 lg:aspect-auto lg:h-[720px]">
      {/* Tile mosaic — one portrait flowing through the centre windows */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-[0.9fr_1.25fr_0.85fr] gap-2 p-2 sm:gap-2.5 sm:p-3">
        {/* Row 1 */}
        <div className="col-start-1 row-start-1 grid place-items-center rounded-[34px] bg-[#DCE7F2]">
          <BookOpen className="h-8 w-8 text-white sm:h-10 sm:w-10" strokeWidth={1.75} />
        </div>
        <PhotoTile
          className="col-start-2 object-cover  row-start-1 rounded-[34px]"
          imgHeight="400.33%"
          imgTop="3%"
        />
        <div className="col-start-3 row-start-1 grid place-items-center rounded-[34px] bg-[#DCE7F2]">
          <GraduationCap className="h-8 w-8 text-white sm:h-10 sm:w-10" strokeWidth={1.75} />
        </div>
        <PhotoTile
          className="col-start-1 object-cover row-start-2 flex flex-col justify-center rounded-t-[90px] rounded-b-[34px] p-4 sm:p-6"
          imgHeight="290%"
          imgTop="-72%"
          imgWidth="293%"
          imgLeft="2%"
          overlay
        >
          <p className="font-display text-sm font-semibold pt-7 leading-snug text-white sm:text-lg">
            Your Journey to Excellence Begins Here.
          </p>
          <span className="mt-3 text-xl leading-none text-[#F26B3A] sm:text-2xl">✳</span>
        </PhotoTile>

        <PhotoTile
          className="col-start-2 object-cover row-start-2 rounded-[40px]"
           imgWidth="290%"
          imgHeight="280%"
          imgTop="-70%"
        />

        <PhotoTile
          className="col-start-3 object-cover row-start-2 flex flex-col items-end justify-center rounded-t-[90px] rounded-b-[34px] p-4 text-right sm:p-6"
          imgHeight="240%"
          imgTop="-70%"
          imgWidth="299%"
          imgLeft="-201%"
          overlay
        >
          <p className="font-display text-sm font-semibold pt-7 leading-snug text-white sm:text-lg">
            Education Beyond Boundaries
          </p>
        </PhotoTile>

        {/* Row 3 — wide bottom arch continuing the same portrait */}
        <PhotoTile
          className="col-start-1 object-cover col-span-3 row-start-3 mx-auto w-[70%] rounded-t-[90px] rounded-b-[34px]"
          imgHeight="369.94%"
          imgTop="-269%"
          imgWidth="142.86%"
          imgLeft="-22%"
        />
      </div>

      {/* Brand */}
      <div className="absolute left-5 top-5 z-10 flex items-center gap-2   px-3 py-2   md:left-8 md:top-7">
        <img src={logo} alt="CodePath" className="h-4 w-auto sm:h-7" />
      </div>

      {/* Orange spark accent */}
      <span className="absolute right-4 top-3 z-10 text-2xl leading-none text-[#F26B3A] sm:text-3xl">✦</span>
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
      className="relative w-full mb-7 bg-[#FBFAF7] px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8"
    >
      <div className="mx-auto grid w-full max-w-350  gap-5 lg:grid-cols-2 lg:gap-6">
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
                    className={`text-sm tracking-tight text-black transition-all duration-200 hover:text-[#7C3AED] ${
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
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-zinc-900 sm:text-5xl lg:text-[3.5rem] xl:text-[4.5rem]">
              <span className="block">Master New Skills</span>
              <span className="block">Track Your Progress</span>
            </h1>

            <p className="max-w-lg text-base leading-relaxed text-zinc-500 lg:text-lg">
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
                <span className="text-sm font-extrabold tracking-tighter text-zinc-900">
                  {idx + 1} / {slides.length}
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
    </section>
  );
}

export default Hero;