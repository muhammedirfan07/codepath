import { Award } from "lucide-react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
  { day: "Mon", hours: 0.8 },
  { day: "Tue", hours: 1.4 },
  { day: "Wed", hours: 1.8 },
  { day: "Thu", hours: 2.1 },
  { day: "Fri", hours: 1.6 },
  { day: "Sat", hours: 4.4 },
  { day: "Sun", hours: 1.1 },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border bg-popover px-4 py-2 shadow-lg">
      <p className="text-sm font-bold text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-primary">
        Watch : {payload[0].value}h
      </p>
    </div>
  );
}

export default function WeeklyWatchTime() {
  const peak = Math.max(...data.map((d) => d.hours));

  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-display font-bold">Weekly Watch Time</p>
          <p className="text-xs text-muted-foreground">
            Peak <span className="font-semibold text-primary">{peak}h</span> · this week
          </p>
        </div>
        <Award className="size-4.5 text-primary" />
      </div>

      <div className="mt-4 h-32 [&_.recharts-wrapper]:outline-none [&_.recharts-surface]:outline-none [&_svg]:outline-none [&_*]:outline-none">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="30%" barSize={32} accessibilityLayer={false}>
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "var(--color-muted)", radius: 8 }}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 11, fontWeight: 500 }}
              dy={8}
            />
            <Bar
              dataKey="hours"
              radius={[6, 6, 6, 6]}
              stroke="none"
              activeBar={{ stroke: "none", fill: "var(--color-primary)" }}
            >
              {data.map((d) => (
                <Cell
                  key={d.day}
                  stroke="none"
                  fill={
                    d.hours === peak
                      ? "var(--color-primary)"
                      : "color-mix(in oklch, var(--color-primary) 70%, transparent)"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}