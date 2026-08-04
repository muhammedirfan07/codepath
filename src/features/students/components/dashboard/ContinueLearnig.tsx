import { MoveRight, BookOpen, ArrowRight } from "lucide-react";

import { Link } from "react-router-dom";
MoveRight;

function ContinueLearnig() {
  const courses = [
    {
      label: "DEVELOPMENT",
      title: "React Fundamentals",
      desc: "Components, hooks, state, and modern React patterns.",
      done: 0,
      total: 8,
      gradient: "gradient-violet",
    },
    {
      label: "DESIGN TRACK",
      title: "JavaScript Deep Dive",
      desc: "Closures, async, prototypes, and the event loop.",
      done: 0,
      total: 8,
      gradient: "gradient-orange",
    },
  ];
  return (
    <section>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <h2 className="truncate font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Continue Learning
        </h2>
        <Link to={"/student/modules"}>
          <span className="  text-violet inline-flex items-center justify-center  whitespace-nowrap font-medium cursor-pointer">
            {" "}
            View all <MoveRight className='className="ml-1 h-3.5 w-3.5"' />
          </span>
        </Link>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {courses.map((c) => (
          <div
            key={c.title}
            className="overflow-hidden rounded-3xl border border-border bg-card"
          >
            <div className={`${c.gradient} p-5 text-primary-foreground`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-semibold tracking-wider opacity-80">
                    {c.label}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-bold">
                    {c.title}
                  </h3>
                </div>
                <div className="flex size-10 items-center justify-center rounded-xl bg-white/20">
                  <BookOpen className="size-5" />
                </div>
              </div>
              <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/25">
                <div
                  className="h-full rounded-full bg-white"
                  style={{ width: `${(c.done / c.total) * 100}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs font-medium opacity-90">
                <span>
                  {c.done}/{c.total} lessons
                </span>
                <span>{c.total - c.done} to go</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4">
              <p className="text-xs text-muted-foreground">{c.desc}</p>
              <button className="flex shrink-0 items-center gap-1 pl-3 text-sm font-semibold text-primary">
                Resume <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ContinueLearnig;
