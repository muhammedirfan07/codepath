import { useMemo } from "react";

const dayLabels = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export default function WeeklyStreakCard() {
  const { days, monthLabel } = useMemo(() => {
    const now = new Date();

    const monday = new Date(now);
    const dow = (now.getDay() + 6) % 7; // 0 = Mon
    monday.setDate(now.getDate() - dow);
    monday.setHours(0, 0, 0, 0);

    const days = dayLabels.map((label, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);

      const isToday =
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate();

      return { label, n: date.getDate(), isToday };
    });

    const monthLabel = now.toLocaleDateString(undefined, { month: "short", year: "numeric" });
    return { days, monthLabel };
  }, []);

  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="truncate font-display font-bold">Appointments This Week</p>
          <p className="text-xs text-muted-foreground">1 booking · 2 total</p>
        </div>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold shrink-0">
          {monthLabel}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1.5">
        {days.map((d) => (
          <div
            key={d.label}
            className={`flex flex-col items-center gap-0.5 rounded-xl py-2 text-center ${
              d.isToday
                ? "bg-accent text-accent-foreground ring-1 ring-primary/40"
                : "bg-secondary/60 text-muted-foreground"
            }`}
          >
            <span className="text-[9px] font-semibold">{d.label}</span>
            <span className="font-display text-sm font-bold">{d.n}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-violet" />Confirmed
        </span>
        <span className="flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-amber" />Pending
        </span>
        <span className="flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-success" />Completed
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-sm">
        <span className="flex items-center gap-2 text-xs">
          <span className="size-1.5 rounded-full bg-violet" />
          Mon 09:00 AM · Ava Chen
        </span>
        <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold">
          Confirmed
        </span>
      </div>
    </div>
  );
}