import { Flame, Target, Trophy } from "lucide-react";

const stats = [
  { icon: Flame, value: "54", label: "DAYS STREAK" },
  { icon: Target, value: "06", label: "GOALS / MONTH" },
  { icon: Trophy, value: "02", label: "2ND PLACE" },
];

export default function ProfileCard() {
  return (
    <div className="rounded-3xl border border-border landing-band-soft p-5">
      <div className="flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-full gradient-violet font-display font-bold text-primary-foreground">
          JD
        </div>
        <div>
          <p className="font-display font-bold leading-tight">John Doe</p>
          <p className="text-xs text-muted-foreground">Learner & Developer</p>
        </div>
      </div>
      <span className="mt-3 inline-block rounded-full bg-card px-3 py-1 text-xs font-semibold shadow-sm">
        🏆 876 Points
      </span>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-card p-3 text-center">
            <s.icon className="mx-auto size-5 text-primary" />
            <p className="mt-1 font-display text-lg font-bold">{s.value}</p>
            <p className="text-[9px] font-semibold tracking-wide text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}