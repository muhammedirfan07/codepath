import React from "react";
import { ArrowRight, Video } from "lucide-react";

const sessions = [
  {
    name: "John Doe",
    initials: "JD",
    datetime: "8/3/2026, 10:00 AM",
    type: "1:1 mentoring session",
    price: 63,
  },
  {
    name: "John Doe",
    initials: "JD",
    datetime: "7/27/2026, 9:00 AM",
    type: "Follow-up session",
    price: 60,
  },
];

export default function UpcomingSession() {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 lg:col-span-2">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-foreground">
          Upcoming sessions
        </h3>
        <button className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          View all
          <ArrowRight className="size-3.5" />
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {sessions.map((session, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-3 rounded-2xl border border-border p-3.5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                {session.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{session.name}</p>
                <p className="text-xs text-muted-foreground">
                  {session.datetime} · {session.type}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                ${session.price}
              </span>
              <button className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
                <Video className="size-3.5" />
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}