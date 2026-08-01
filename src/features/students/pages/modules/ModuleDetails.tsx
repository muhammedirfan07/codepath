import { useState } from "react";
import { Award, Clock, Play, Share2, Star } from "lucide-react";
import LessonModal, { type LessonDetail } from "../../components/LessonModal";
import { Link } from "react-router-dom";
import StudentHeader from "../../components/StudentHeader";
import StudentSidebar from "../../components/StudentSidebar";
import AiAssistant from "../../components/AiAssistant";

interface LessonRow {
  id: string;
  order: number;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
}

const LESSONS: LessonRow[] = [
  {
    id: "jsx-components",
    order: 1,
    title: "JSX and Components",
    description: "How React describes UI with JSX and reusable components.",
    difficulty: "Beginner",
    duration: "18 min",
  },
  {
    id: "props-state",
    order: 2,
    title: "Props and State",
    description: "Pass data down and manage state within components.",
    difficulty: "Beginner",
    duration: "22 min",
  },
  {
    id: "hooks-effects",
    order: 3,
    title: "useEffect & Data Fetching",
    description: "Run side effects and fetch data after render.",
    difficulty: "Intermediate",
    duration: "25 min",
  },
];

const LESSON_DETAILS: Record<string, LessonDetail> = {
  "jsx-components": {
    title: "JSX and Components",
    description: "How React describes UI with JSX and reusable components.",
    difficulty: "Beginner",
    duration: "18 min",
    moduleTitle: "React Fundamentals",
    watchTarget: "2:00",
    transcript: [
      { time: "0:00", text: "JSX must return a single root" },
      { time: "0:40", text: "Components are PascalCase" },
      { time: "1:20", text: "Props are read-only" },
    ],
    bestExplanation: {
      summary:
        "JSX is a syntax extension for JavaScript that looks like HTML. React compiles JSX into React.createElement calls. Components are functions that return JSX and can be reused across your app.",
      points: [
        "JSX must return a single root",
        "Components are PascalCase",
        "Props are read-only",
      ],
    },
    example: {
      language: "jsx",
      code: `function Welcome({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}`,
    },
  },
};

export default function ModuleDetail() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const completed = 0;

  return (
    <div className="flex min-h-screen w-full">
      <StudentSidebar
        mobileOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
      <div className="flex flex-1 flex-col">
        <StudentHeader onMenuClick={() => setMobileNavOpen(true)} />

        <main className="flex-1 overflow-x-hidden bg-background p-4 md:p-6">
          <div className="mx-auto max-w-7xl p-4 md:p-6">
            <div className="rounded-2xl border border-sky/20 bg-sky/10 p-6">
              <p className="text-sm text-muted-foreground">
                <Link className="hover:text-violet" to="/student/modules">
                  Modules
                </Link>{" "}
                /{" "}
                <span className=" font-semibold text-foreground">
                  React Fundamentals
                </span>
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                  React Fundamentals
                </h1>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-sm font-medium text-sky shadow-sm">
                  <Award className="h-4 w-4" /> React Explorer
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Components, hooks, state, and modern React patterns.
              </p>

              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  {completed} of {LESSONS.length} lessons complete
                </span>
                <span>{Math.round((completed / LESSONS.length) * 100)}%</span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-background/60">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${(completed / LESSONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Featured video */}
            <div className="mt-6 grid gap-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:grid-cols-2">
              <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-indigo-950">
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-red-600 shadow-lg transition hover:scale-105">
                    <Play className="h-6 w-6 fill-current" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-2 p-6">
                <span className="inline-flex w-fit items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                  <Play className="h-3 w-3 fill-current" /> TOP-RATED COURSE ·
                  FEATURED
                </span>
                <h3 className="text-lg font-semibold text-foreground">
                  React Tutorial for Beginners
                </h3>
                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-amber text-amber" /> 4.9 ·
                  Highest rated for React Fundamentals
                </p>
                <p className="text-sm text-muted-foreground">
                  Start here for the fastest path to mastery.
                </p>
                <p className="text-sm text-muted-foreground">
                  Each lesson below has its own timestamped video segment. Watch
                  to the end to auto-complete.
                </p>
              </div>
            </div>

            {/* Lessons */}
            <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
              {LESSONS.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <button className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Play className="h-4 w-4 fill-current" />
                    </button>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span>Lesson {lesson.order}</span>
                        <span className="rounded-full bg-secondary px-2 py-0.5 font-medium text-secondary-foreground">
                          {lesson.difficulty}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {lesson.duration}
                        </span>
                      </div>
                      <p className="mt-1 font-medium text-foreground">
                        {lesson.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {lesson.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pl-12 sm:pl-0">
                    <button
                      onClick={() => setActiveLessonId(lesson.id)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                    >
                      Open <Share2 className="h-3.5 w-3.5" />
                    </button>
                    {/* per-lesson row "Full page" link */}
                    <Link
                      to={`/student/modules/react/lessons/${lesson.id}`}
                      state={{
                        lesson: LESSON_DETAILS[lesson.id],
                        backHref: "/student/modules/react",
                      }}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      Full page
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {activeLessonId && LESSON_DETAILS[activeLessonId] && (
              <LessonModal
                lesson={LESSON_DETAILS[activeLessonId]}
                fullPageHref={`/student/modules/react/lessons/${activeLessonId}`}
                onClose={() => setActiveLessonId(null)}
                onNext={
                  () => setActiveLessonId(null) /* wire to next lesson id */
                }
              />
            )}
          </div>
        </main>
      </div>
      <AiAssistant />
    </div>
  );
}
