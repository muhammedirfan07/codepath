
import { ArrowRight, Star, Play, Flame, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";

const courses = [
  {
    slug: "nodejs-express-full-course",
    tag: "New",
    provider: "freeCodeCamp",
    title: "Node.js and Express.js Full Course",
    rating: 4.7,
    reviews: 540,
    price: "Free",
    badgeIcon: Flame,
    thumb: (
      <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-[#0b1a3a] to-[#03060f] px-6 text-center">
        <div className="flex items-center gap-2 text-2xl font-bold text-white">
          <span className="text-emerald-400">node</span>
          <span className="opacity-60">&</span>
          <span>Express</span>
        </div>
        <p className="mt-2 font-display text-3xl font-extrabold tracking-wide text-white">
          FULL COURSE
        </p>
      </div>
    ),
  },
  {
    slug: "python-full-course-beginners",
    tag: "New",
    provider: "freeCodeCamp",
    title: "Python Full Course for Beginners",
    rating: 4.7,
    reviews: 540,
    price: "Free",
    badgeIcon: Flame,
    thumb: (
      <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-[#0d0b2b] to-[#050414] px-6 text-center">
        <p className="text-lg font-semibold text-blue-300">🐍 Python</p>
        <p className="font-display text-3xl font-extrabold tracking-wide text-white">
          in 4 hours
        </p>
        <p className="mt-1 font-display text-xl font-bold text-white/90">Full Course</p>
      </div>
    ),
  },
  {
    slug: "sql-databases-full-course",
    tag: "New",
    provider: "freeCodeCamp",
    title: "SQL and Databases Full Course",
    rating: 4.8,
    reviews: 312,
    price: "Free",
    badgeIcon: Database,
    thumb: (
      <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-[#1a0f2e] to-[#050414] px-6 text-center">
        <Database className="mx-auto size-10 text-sky" />
        <p className="mt-2 font-display text-2xl font-extrabold tracking-wide text-white">
          SQL Databases
        </p>
      </div>
    ),
  },
  {
    slug: "mongodb-crash-course",
    tag: "New",
    provider: "freeCodeCamp",
    title: "MongoDB Crash Course",
    rating: 4.6,
    reviews: 208,
    price: "Free",
    badgeIcon: Flame,
    thumb: (
      <div className="flex h-full flex-col items-center justify-center bg-[#001408] px-6 text-center">
        <p className="font-display text-3xl font-extrabold tracking-wide text-emerald-400">
          MongoDB
        </p>
      </div>
    ),
  },
];

export default function RecommentCourses() {
  const navigate = useNavigate();

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold">Recommended Courses For You</h2>
        <button className="flex items-center gap-1 text-sm font-medium text-primary">
          Browse <ArrowRight className="size-3.5" />
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {courses.map((c) => (
          <div
            key={c.slug}
          onClick={() => navigate(`/courses/${c.slug}`)}
            className="group cursor-pointer overflow-hidden rounded-3xl border border-border bg-card transition-shadow hover:shadow-lg hover:shadow-primary/10"
          >
            <div className="relative h-52 overflow-hidden">
              <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-110">
                {c.thumb}
              </div>

              <span className="absolute left-4 top-4 z-10 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                {c.tag}
              </span>
              <div className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                <c.badgeIcon className="size-4 text-white" />
              </div>

              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
                <button
                  onClick={(e) => {
                  e.stopPropagation();
                  navigate({
                    pathname: `/courses/${c.slug}`,
                    search: "?play=true",
                  });
                }}
                  className="flex size-14 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg transition-transform hover:scale-110"
                >
                  <Play className="size-6 fill-current pl-0.5" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <p className="font-display font-semibold leading-snug">{c.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{c.provider}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="flex items-center gap-1 text-sm font-medium">
                  <Star className="size-4 fill-amber text-amber" />
                  {c.rating} ({c.reviews})
                </span>
                <span className="text-sm font-semibold text-primary">{c.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}