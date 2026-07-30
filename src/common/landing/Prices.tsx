import { Check, Sparkles } from "lucide-react";

function Prices() {
  const stats = [
    { v: "15,000+", l: "Active learners with expert guidance and interactive learning." },
    { v: "500+", l: "Expert-led courses covering practical skills and real-world applications." },
    { v: "24/7", l: "Learn anytime, anywhere, at your own pace with convenience and ease." },
    { v: "95%", l: "High retention rate, helping learners advance in their careers." },
  ];
  const plans = [
    {
      name: "Starter",
      price: "Free",
      sub: "Start learning today with free courses and community support.",
      features: [
        "Access to selected free courses",
        "Basic quizzes & exercises",
        "Community support",
        "Mobile and desktop access",
        "Basic progress tracking",
      ],
      cta: "Get started",
      highlight: false,
    },
    {
      name: "Pro Plan",
      price: "$19",
      per: "/month",
      sub: "Unlock unlimited courses, interactive projects, and certificates to level up your skills.",
      features: [
        "Unlimited course access",
        "Interactive projects & quizzes",
        "Course completion certificates",
        "Priority support",
        "Downloadable resources & study materials",
      ],
      cta: "Get started",
      highlight: true,
    },
    {
      name: "Premium Plan",
      price: "$49",
      per: "/month",
      sub: "Access exclusive lessons, mentorship and premium resources to fast-track your growth.",
      features: [
        "Everything in Pro Plan",
        "Exclusive masterclasses & live sessions",
        "1-on-1 mentorship",
        "Priority access to new courses",
        "Career guidance & resume-building support",
      ],
      cta: "Get started",
      highlight: false,
    },
  ];

  return (
    <>
      <section className="w-full bg-[#7C3AED] px-4 py-14 md:px-6 md:py-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.v} className="text-white">
              <div className="font-display text-3xl font-semibold md:text-4xl">
                {s.v}
              </div>
              <p className="mt-2 max-w-xs text-xs leading-relaxed text-white/85 md:text-sm">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="w-full bg-[#FBFAF7] px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-sm font-semibold text-[#7C3AED] uppercase tracking-[0.2em]">
              Pricing
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-[#111] md:text-4xl lg:text-[44px]">
              Choose Your Plan
            </h2>
            <p className="mt-3 text-sm text-[#6B6B6B] md:text-base">
              Choose a flexible plan tailored to your learning and career growth goals.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-start">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`group relative flex flex-col rounded-3xl p-8 transition-all duration-500 ease-out ${
                  p.highlight
                    ? "border-2 border-[#7C3AED] bg-white shadow-[0_30px_60px_-20px_rgba(124,58,237,0.4)] lg:-translate-y-4 lg:scale-[1.03]"
                    : "border border-black/[0.06] bg-white shadow-sm hover:-translate-y-1.5 hover:border-[#7C3AED]/25 hover:shadow-xl"
                }`}
              >
                {p.highlight && (
                  <>
                    {/* soft glow behind the card */}
                    <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-[#7C3AED]/10 blur-2xl" />
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] px-4 py-1.5 text-xs font-semibold text-white shadow-[0_8px_20px_-6px_rgba(124,58,237,0.6)]">
                        <Sparkles className="h-3 w-3" />
                        Most Popular
                      </span>
                    </div>
                  </>
                )}

                <div className="flex items-center gap-2">
                  <div
                    className={`text-sm font-semibold tracking-wide ${
                      p.highlight ? "text-[#7C3AED]" : "text-[#1A1A1A]"
                    }`}
                  >
                    {p.name}
                  </div>
                </div>

                <p className="mt-3 min-h-[40px] text-sm leading-relaxed text-[#6B6B6B]">
                  {p.sub}
                </p>

                <div className="mt-6 flex items-baseline gap-1.5 border-t border-black/[0.06] pt-6">
                  <span className="font-display text-5xl font-bold tracking-tight text-[#111]">
                    {p.price}
                  </span>
                  {p.per && (
                    <span className="text-sm font-medium text-[#8A8A8A]">
                      {p.per}
                    </span>
                  )}
                </div>

                <button
                  className={`mt-6 w-full cursor-pointer rounded-full py-3 text-sm font-semibold transition-all duration-300 ${
                    p.highlight
                      ? "bg-[#7C3AED] text-white shadow-[0_14px_28px_-10px_rgba(124,58,237,0.7)] hover:bg-[#6D28D9] hover:shadow-[0_18px_32px_-8px_rgba(124,58,237,0.8)]"
                      : "bg-[#F5F1FF] text-[#1A1A1A] hover:bg-[#111] hover:text-white"
                  }`}
                >
                  {p.cta}
                </button>

                <ul className="mt-8 space-y-3.5 border-t border-black/[0.06] pt-6">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-[#2A2A2A]"
                    >
                      <span
                        className={`mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full ${
                          p.highlight ? "bg-[#7C3AED]/15" : "bg-[#F5F1FF]"
                        }`}
                      >
                        <Check className="h-3 w-3 text-[#7C3AED]" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
       <section id="contact" className="w-full px-4 pb-20 md:px-6">
      <div className="mx-auto w-full max-w-7xl">
        <div className="overflow-hidden rounded-3xl border border-[#7C3AED]/20 bg-[#EDE9FE] p-8 md:p-12">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div>
              <h3 className="font-display text-2xl font-semibold text-[#1A1A1A] md:text-3xl">
                Join 5000+ Learners
              </h3>
              <p className="mt-4 text-[11px] text-[#6B6B6B]">
                Stay updated with the latest insights and resources.
              </p>
            </div>
            <form className="flex w-full flex-col gap-2 sm:flex-row  md:w-[420px]">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-11 flex-1 border-black/10 bg-white rounded-md px-3 py-3 md:py-0 text-[#6B6B6B] shadow-md outline-0"
              />
              <button type="submit" className="bg-[#7C3AED] text-white shadow-[0_10px_24px_-10px_rgba(124,58,237,0.7)] hover:bg-[#6D28D9] px-5 text-md py-2 cursor-pointer rounded-md ">
                Subscribe
              </button>
            </form>
          </div>
          <p className="mt-4 text-[11px] text-[#6B6B6B]">
            We respect your privacy. Read our policy for details.
          </p>
        </div>
      </div>
    </section>
    </>
  );
}

export default Prices;