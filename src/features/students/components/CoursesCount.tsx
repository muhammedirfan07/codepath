import { BookOpen, Trophy } from "lucide-react";

export default function CoursesCount() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-3xl border border-border bg-card p-4">
        <div className="flex size-9 items-center justify-center rounded-xl bg-accent">
          <BookOpen className="size-4.5 text-accent-foreground" />
        </div>
        <p className="mt-3 font-display text-2xl font-bold">0</p>
        <p className="text-xs text-muted-foreground">In Progress · Courses</p>
      </div>
      <div className="rounded-3xl border border-border bg-card p-4">
        <div className="flex size-9 items-center justify-center rounded-xl bg-accent">
          <Trophy className="size-4.5 text-accent-foreground" />
        </div>
        <p className="mt-3 font-display text-2xl font-bold">0</p>
        <p className="text-xs text-muted-foreground">Completed · Courses</p>
      </div>
    </div>
  );
}