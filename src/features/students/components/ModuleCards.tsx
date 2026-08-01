import { BookOpen, Clock, Crown, Lock, Play, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";


type Accent = "sky" | "amber" | "success" | "violet";

const ACCENT_STYLES: Record<Accent, { card: string; icon: string }> = {
  sky: { card: "border-sky/20 bg-sky/10 hover:shadow-sky/10", icon: "bg-sky/15 text-sky" },
  amber: { card: "border-amber/20 bg-amber/10 hover:shadow-amber/10", icon: "bg-amber/15 text-amber" },
  success: { card: "border-success/20 bg-success/10 hover:shadow-success/10", icon: "bg-success/15 text-success" },
  violet: { card: "border-violet/20 bg-violet/10 hover:shadow-violet/10", icon: "bg-violet/15 text-violet" },
};

interface ModuleCardProps {
  id: string;
  icon: LucideIcon;
  accent: Accent;
  title: string;
  description: string;
  lessonsCount: number;
  doneCount: number;
  hours: string;
  isPro?: boolean;
}

export default function ModuleCard({
  id,
  icon: Icon,
  accent,
  title,
  description,
  lessonsCount,
  doneCount,
  hours,
  isPro,
}: ModuleCardProps) {
  const styles = ACCENT_STYLES[accent];
  const progress = lessonsCount ? Math.round((doneCount / lessonsCount) * 100) : 0;

  return (
    <div
      className={`flex flex-col justify-between rounded-2xl border p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg ${styles.card}`}
    >
      <div>
        <div className="flex items-start justify-between">
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${styles.icon}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-2">
            {isPro && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber/15 px-2.5 py-1 text-xs font-semibold text-amber">
                <Crown className="h-3 w-3" /> PRO
              </span>
            )}
            <span className="rounded-full bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              {lessonsCount} lessons
            </span>
          </div>
        </div>

        <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>

        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" /> {doneCount}/{lessonsCount} done
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {hours}
          </span>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-background/60">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {isPro ? (
          <button
            disabled
            className="mt-4 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-card py-2.5 text-sm font-semibold text-muted-foreground shadow-sm"
          >
            <Lock className="h-4 w-4" /> Unlock with Pro
          </button>
        ) : (
          <Link
            to={`/student/modules/${id}`}
            className="mt-4 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            <Play className="h-4 w-4 fill-current" /> Start
          </Link>
        )}
      </div>
    </div>
  );
}