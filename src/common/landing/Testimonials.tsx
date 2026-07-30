import { Star } from "lucide-react";

function Testimonials() {
  const t = [
    {
      q: "This platform transformed my learning! The dashboard made tracking progress easy, and now I've ranked my dream job!",
      name: "Sophia Laurent",
      role: "Digital Marketer",
      i: "SL",
    },
    {
      q: "I struggled to stay motivated, but the dashboard kept me on track. Now, I run my own successful business!",
      name: "James Rew",
      role: "Entrepreneur",
      i: "JR",
    },
    {
      q: "The insights helped me improve fast — I confidently and clearly skilled than ever!",
      name: "James Terrah",
      role: "UI/UX Designer",
      i: "JT",
    },
    {
      q: "It's a game-changer! I went from a complete beginner to just a few months!",
      name: "Henry Long",
      role: "Online Growth",
      i: "HL",
    },
    {
      q: "The structured courses and easy progress tracking helped me master new skills effortlessly and quickly!",
      name: "David Wong",
      role: "Data Analyst",
      i: "DW",
    },
    {
      q: "I learned faster and applied my skills immediately. Truly the best investment I've ever made!",
      name: "Wilson Pang",
      role: "Project Manager",
      i: "WP",
    },
  ];

  // full set per row (not just 2) so the loop has real distance to travel
  const rows: { data: typeof t; anim: string }[] = [
    { data: t, anim: "animate-marquee" },
    { data: [...t].reverse(), anim: "animate-marquee-reverse" },
    { data: t, anim: "animate-marquee-slow" },
  ];

  const Card = ({ x, violet }: { x: (typeof t)[number]; violet: boolean }) => (
    <div
      className={`group/card flex w-[320px] flex-shrink-0 flex-col rounded-2xl border p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl ${
        violet
          ? "border-violet/20 bg-violet hover:shadow-violet/30"
          : "border-black/[0.06] bg-white hover:shadow-black/10"
      }`}
    >
      <div className={`flex gap-0.5 ${violet ? "text-white" : "text-violet"}`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${violet ? "fill-white" : "fill-violet"}`}
          />
        ))}
      </div>
      <p
        className={`mt-3 flex-1 text-sm leading-relaxed ${
          violet ? "text-white/90" : "text-[#2A2A2A]"
        }`}
      >
        "{x.q}"
      </p>
      <div
        className={`mt-4 flex items-center gap-3 border-t pt-4 ${
          violet ? "border-white/15" : "border-black/5"
        }`}
      >
        <div
          className={`h-8 w-8 flex-shrink-0 rounded-full text-[10px] flex items-center justify-center transition-transform duration-300 group-hover/card:scale-110 ${
            violet ? "bg-white text-violet" : "bg-violet text-white"
          }`}
        >
          {x.i}
        </div>
        <div>
          <div
            className={`text-xs font-semibold ${violet ? "text-white" : "text-[#111]"}`}
          >
            {x.name}
          </div>
          <div
            className={`text-[10px] ${violet ? "text-white/70" : "text-[#8A8A8A]"}`}
          >
            {x.role}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="w-full overflow-hidden px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto w-full max-w-9xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-violet">
            Testimonials
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#111] md:text-4xl">
            What Our Experts Say
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#6B6B6B] md:text-base">
            Gain insights from industry experts on how our platform empowers
            learners to grow, upskill, and reach their full potential.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-4">
          {rows.map((row, ri) => (
            <div
              key={ri}
              className="group/row overflow-hidden py-2"
              style={{
                maskImage:
                  "linear-gradient(90deg, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)",
              }}
            >
              <div
                className={`flex w-max gap-4 ${row.anim} group-hover/row:[animation-play-state:paused]`}
              >
                {[...row.data, ...row.data].map((x, idx) => (
                  <Card
                    key={`${ri}-${x.name}-${idx}`}
                    x={x}
                    violet={idx % 2 === 1}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
