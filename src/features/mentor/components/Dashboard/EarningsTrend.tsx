import React from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { day: "W", amount: 0 },
  { day: "T", amount: 0 },
  { day: "F", amount: 0 },
  { day: "S", amount: 0 },
  { day: "S", amount: 0 },
  { day: "M", amount: 0 },
];

export default function EarningsTrend() {
  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <h3 className="font-display text-base font-semibold text-foreground">Earnings trend</h3>
      <p className="text-xs text-muted-foreground">Daily payouts</p>

      <div className="mt-4 h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            />
            <YAxis hide domain={[0, 1]} />
            <Tooltip
              contentStyle={{
                background: "var(--color-popover)",
                border: "1px solid var(--color-border)",
                borderRadius: 12,
                fontSize: 12,
              }}
              formatter={(value) => [`$${value}`, "Earnings"]}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="var(--color-amber)"
              strokeWidth={2.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}