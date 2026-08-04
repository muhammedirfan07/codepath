import { Link, useLocation, useNavigate } from "react-router-dom";
import LessonContent from "../../components/modules/LessonContent";
import type { LessonDetail } from "../../components/modules/LessonModal";

interface LessonFullPageState {
  lesson: LessonDetail;
  backHref: string;
  nextHref?: string;
}

function LessonFullPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LessonFullPageState | null;

  if (!state?.lesson) {
    return (
      <main className="flex-1 overflow-x-hidden bg-background p-4 md:p-6">
        <div className="mx-auto max-w-4xl">
          <p className="text-foreground">No lesson data — open this page from a module's lesson list.</p>
          <button
            onClick={() => navigate("/student/modules")}
            className="mt-3 text-sm font-medium text-primary underline"
          >
            Back to modules
          </button>
        </div>
      </main>
    );
  }

  const { lesson, backHref, nextHref } = state;

  return (
    <main className="flex-1 overflow-x-hidden bg-background p-4 md:p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4">
          <h2 className="truncate font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Learning modules
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Complete every lesson to earn the module badge, then have admin approve it.
          </p>
        </div>

        <p className="text-sm text-muted-foreground">
          <Link className="hover:text-violet" to={backHref}>
            {lesson.moduleTitle}
          </Link>{" "}
          / <span className="font-semibold text-foreground">{lesson.title}</span>
        </p>

        <div className="mt-4 rounded-2xl border border-border bg-card p-6">
          <LessonContent lesson={lesson} />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Link to={backHref} className="text-sm font-medium text-muted-foreground hover:text-foreground">
            ← Back to module
          </Link>
          {nextHref && (
            <Link
              to={nextHref}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Next lesson →
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}

export default LessonFullPage;