import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Video } from "lucide-react";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

type Session = {
  name: string;
  initials: string;
  time: string;
  type: string;
  duration: string;
  status: "Confirmed" | "Pending";
};

// Sessions keyed by yyyy-mm-dd
const SESSIONS_BY_DATE: Record<string, Session[]> = {
  "2026-08-03": [
    {
      name: "John Doe",
      initials: "JD",
      time: "10:00 AM",
      type: "1:1 mentoring session",
      duration: "60 min",
      status: "Confirmed",
    },
  ],
};

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function toKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export default function AppointmentStrike() {
  const today = useMemo(() => new Date(), []);
  const [cursor, setCursor] = useState(new Date(2026, 7, 1)); 
  const [selected, setSelected] = useState(new Date());

  const monthLabel = cursor.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const selectedLabel = selected.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  const sessions = SESSIONS_BY_DATE[toKey(selected)] ?? [];

  const weeks = useMemo(() => {
    const firstOfMonth = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const startOffset = firstOfMonth.getDay();
    const gridStart = new Date(firstOfMonth);
    gridStart.setDate(firstOfMonth.getDate() - startOffset);

    const days: Date[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(gridStart);
      d.setDate(gridStart.getDate() + i);
      days.push(d);
    }

    const rows: Date[][] = [];
    for (let i = 0; i < days.length; i += 7) rows.push(days.slice(i, i + 7));
    while (
      rows.length > 5 &&
      rows[rows.length - 1].every((d) => d.getMonth() !== cursor.getMonth())
    ) {
      rows.pop();
    }
    return rows;
  }, [cursor]);

  return (
    <>
      <div className="rounded-3xl border border-border shadow-lg bg-card p-5 lg:col-span-1">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-base font-semibold text-foreground">Appointments</h3>
          <span className="flex size-6 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
            {Object.keys(SESSIONS_BY_DATE).length}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
            className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary"
            aria-label="Previous month"
          >
            <ChevronLeft className="size-4" />
          </button>
          <p className="text-sm font-semibold text-foreground">{monthLabel}</p>
          <button
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
            className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary"
            aria-label="Next month"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="mt-3 grid grid-cols-7 gap-y-1 text-center">
          {WEEKDAYS.map((d) => (
            <span key={d} className="text-[11px] text-green-700 font-medium ">
              {d}
            </span>
          ))}

          {weeks.flat().map((date, idx) => {
            const inMonth = date.getMonth() === cursor.getMonth();
            const isToday = isSameDay(date, today);
            const isSelected = isSameDay(date, selected);
            const hasSession = Boolean(SESSIONS_BY_DATE[toKey(date)]?.length);

            return (
              <button
                key={idx}
                onClick={() => setSelected(date)}
                className={`relative mx-auto flex size-9 items-center justify-center rounded-md text-sm transition-colors ${
                  isSelected
                    ? "bg-primary font-semibold text-primary-foreground"
                    : isToday
                      ? "bg-accent font-semibold text-accent-foreground"
                      : inMonth
                        ? "text-foreground hover:bg-secondary"
                        : "text-muted-foreground/50 hover:bg-secondary"
                }`}
              >
                {date.getDate()}
                {hasSession && !isSelected && (
                  <span className="absolute bottom-1 size-1 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-5 lg:col-span-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display text-base font-semibold text-foreground">
              {selectedLabel}
            </h3>
            <p className="text-xs text-muted-foreground">
              {sessions.length} session{sessions.length === 1 ? "" : "s"} scheduled
            </p>
          </div>
          <button className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            All bookings
            <ArrowRight className="size-3.5" />
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {sessions.length === 0 ? (
            <div className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-border text-sm text-muted-foreground">
              No sessions scheduled for this day
            </div>
          ) : (
            sessions.map((session, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-3 rounded-2xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-12 flex-col items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                    <span className="text-xs font-bold leading-none">
                      {session.time.split(" ")[0]}
                    </span>
                    <span className="text-[9px] leading-none">{session.time.split(" ")[1]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{session.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {session.type} · {session.duration}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success">
                    {session.status}
                  </span>
                  <button className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
                    <Video className="size-3.5" />
                    Join
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}