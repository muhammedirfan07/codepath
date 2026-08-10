import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { day: "T", sessions: 1 },
  { day: "W", sessions: 0 },
  { day: "T", sessions: 0 },
  { day: "F", sessions: 0 },
  { day: "S", sessions: 0 },
  { day: "S", sessions: 0 },
  { day: "M", sessions: 0 },
];

export default function SessionAnalysis() {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 lg:col-span-2">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-display text-base font-semibold text-foreground">
            Session analysis
          </h3>
          <p className="text-xs text-muted-foreground">Bookings across the last 7 days</p>
        </div>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          7 days
        </span>
      </div>

      <div className="mt-4 h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="4 4" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            />
            <YAxis
              domain={[0, 1]}
              ticks={[0, 0.25, 0.5, 0.75, 1]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "var(--color-secondary)" }}
              contentStyle={{
                background: "var(--color-popover)",
                border: "1px solid var(--color-border)",
                borderRadius: 12,
                fontSize: 12,
              }}
            />
            <Bar dataKey="sessions" fill="var(--color-primary)" radius={[6, 6, 6, 6]} maxBarSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}