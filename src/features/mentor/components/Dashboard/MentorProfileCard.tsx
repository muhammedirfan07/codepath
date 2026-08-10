import React from "react";
import { Star } from "lucide-react";

const mentor = {
  name: "Ava Chen",
  title: "Senior React engineer @ Vercel",
  initials: "AC",
  sessions: 0,
  rating: 5.0,
  reviews: 4,
  hourlyRate: 80,
  skills: ["React", "TypeScript", "Next.js", "JavaScript"],
};

export default function MentorProfileCard() {
  return (
    <div className=" rounded-3xl border-0 gradient-violet p-4 text-white shadow-lg sm:col-span-2 sm:p-5 lg:col-span-1 lg:row-span-2">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex size-14 items-center justify-center rounded-full bg-white/15 text-lg font-bold ring-2 ring-white/30">
            {mentor.initials}
          </div>
          <div className="min-w-0">
            <p className="truncate font-display text-lg font-bold">{mentor.name}</p>
            <p className="truncate text-sm text-primary-foreground/80">{mentor.title}</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          <div className="rounded-2xl bg-white/10 px-2 py-3 text-center">
            <p className="text-xl font-bold">{mentor.sessions}</p>
            <p className="text-[11px] uppercase tracking-wide text-primary-foreground/75">
              Sessions
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 px-2 py-3 text-center">
            <p className="flex items-center justify-center gap-1 text-xl font-bold">
              {mentor.rating.toFixed(1)}
              <Star className="size-3.5 fill-current" />
            </p>
            <p className="text-[11px] uppercase tracking-wide text-primary-foreground/75">
              Rating
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 px-2 py-3 text-center">
            <p className="text-xl font-bold">{mentor.reviews}</p>
            <p className="text-[11px] uppercase tracking-wide text-primary-foreground/75">
              Reviews
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-white/10 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-primary-foreground/80">Hourly rate</span>
            <span className="font-display text-lg font-bold">${mentor.hourlyRate}/hr</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {mentor.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <button className="flex-1 rounded-full bg-white py-2.5 text-sm font-semibold text-primary transition-opacity hover:opacity-90">
          Edit profile
        </button>
        <button className="flex-1 rounded-full bg-white/15 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-white/25">
          Schedule
        </button>
      </div>
    </div>
  );
}