import { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";

const options = ["Sorts an array", "Flattens nested arrays", "Removes duplicates", "Reverses order"];

export default function DailyQuestion() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold">Daily Question</h2>
        <button className="flex items-center gap-1 text-sm font-medium text-primary">
          All quizzes <ArrowRight className="size-3.5" />
        </button>
      </div>
      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        <div className="flex items-center justify-between gradient-violet px-5 py-4 text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-white/20">
              <Sparkles className="size-4.5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-wider opacity-80">
                PRACTICE · JAVASCRIPT
              </p>
              <p className="font-semibold">Question #11</p>
            </div>
          </div>
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
            +10 XP
          </span>
        </div>

        <div className="p-5">
          <h3 className="font-display text-lg font-semibold">
            What does <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-base">Array.prototype.flat()</code> do?
          </h3>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => setSelected(opt)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                  selected === opt
                    ? "border-primary bg-accent text-accent-foreground"
                    : "border-border hover:bg-secondary"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Pick an option to check your answer.</p>
            <button className="flex items-center gap-1 rounded-full border border-border px-5 py-2 text-sm font-semibold">
              Skip <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}