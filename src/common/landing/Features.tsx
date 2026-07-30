import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import CourseTableMock from "../../ui/CourseTableMock";
import MentorMock from "../../ui/MentorMock";
import PerformanceMock from "../../ui/PerformanceMock";
import QuizJoinMock from "../../ui/QuizJoinMock";
import QuizScoreMock from "../../ui/QuizScoreMock";

const MUTED = "text-[#6B6B6B]";

// lightweight scroll-reveal hook — no external deps, no "motion" import
function useInView<T extends HTMLElement>(threshold = 0.3) {
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

function SectionHead({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  return (
    <div
      ref={ref}
      className={`text-center transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#7C3AED]">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#111] md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-[#6B6B6B] md:text-base">
        {subtitle}
      </p>
    </div>
  );
}

function BentoCard({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
      className={`rounded-[32px] border border-black/5 bg-white p-6 shadow-sm transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-xl ${
        inView
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-6 scale-[0.98]"
      }`}
    >
      {children}
    </div>
  );
}

function Features() {
  return (
    <section id="features" className="w-full  px-4 py-20 md:px-6 md:py-25">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHead
          eyebrow="Features"
          title="Smart Features for Better Learning"
          subtitle="Gain insights, track progress, and stay engaged with a seamless and interactive learning experience."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {/* LEFT COLUMN (spans 2) */}
          <div className="grid gap-5 lg:col-span-2">
            <BentoCard delay={0}>
              <div className="grid gap-6 md:grid-cols-[1fr_1.15fr] md:items-center">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-[#1A1A1A]">
                    Smart Performance Tracking
                  </h3>
                  <p className={`mt-2 text-sm leading-relaxed ${MUTED}`}>
                    Track progress, improve efficiency, and maximize learning
                    outcomes.
                  </p>
                </div>
                <PerformanceMock />
              </div>
            </BentoCard>

            <div className="grid gap-5 md:grid-cols-2">
              <BentoCard delay={100}>
                <h3 className="font-display text-xl font-semibold text-[#1A1A1A]">
                  Course Progress
                </h3>
                <p className={`mt-2 text-sm leading-relaxed ${MUTED}`}>
                  Track lessons, skill levels, and categories as you advance
                  efficiently and effortlessly.
                </p>
                <CourseTableMock />
              </BentoCard>

              <BentoCard delay={200}>
                <QuizJoinMock />
                <h3 className="mt-6 font-display text-xl font-semibold text-[#1A1A1A]">
                  Leaderboard & Quizzes
                </h3>
                <p className={`mt-2 text-sm leading-relaxed ${MUTED}`}>
                  Join quizzes, climb the leaderboard, and compete with learners
                  worldwide.
                </p>
              </BentoCard>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="grid gap-5">
            <BentoCard delay={150}>
              <MentorMock />
              <h3 className="mt-6 font-display text-xl font-semibold text-[#1A1A1A]">
                1:1 Expert Mentors
              </h3>
              <p className={`mt-2 text-sm leading-relaxed ${MUTED}`}>
                Book live sessions with vetted mentors for guidance, code
                reviews, and career advice.
              </p>
            </BentoCard>

            <BentoCard delay={250}>
              <div className="grid gap-4">
                <div>
                  <h3 className="font-display text-xl font-semibold text-[#1A1A1A]">
                    Interactive Quizzes
                  </h3>
                  <p className={`mt-2 text-sm leading-relaxed ${MUTED}`}>
                    Test skills, earn points, and invite your friends.
                  </p>
                </div>
                <QuizScoreMock />
              </div>
            </BentoCard>
          </div>
        </div>

        <div className="mt-10 flex text-nowrap justify-center">
          <button className="bg-[#7C3AED] text-white shadow-[0_10px_24px_-10px_rgba(124,58,237,0.7)] hover:bg-[#6D28D9] px-8 text-md py-2 rounded-full group">
            <Link
              to="/register"
              className="flex items-center gap-1 whitespace-nowrap"
            >
              Get Started
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Features;