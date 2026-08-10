import React from "react";
import { CalendarClock, Wallet, ArrowUpRight, ArrowRight } from "lucide-react";

const stats = {
  pendingRequests: 0,
  todaysSessions: 0,
  confirmedTotal: 2,
  earnings: 0,
  paidSessions: 0,
};

export default function CounterCards() {
  return (
    <>
      <div className="flex flex-col justify-between rounded-3xl gradient-orange p-5 text-amber-foreground">
        <div className="flex items-start justify-between">
          <p className="text-sm font-medium text-amber-foreground/85">Pending requests</p>
        </div>
        <div>
          <p className="font-display text-4xl font-bold">{stats.pendingRequests}</p>
          <p className="text-xs text-amber-foreground/80">to review</p>
        </div>
        <button className="mt-4 flex items-center gap-1 text-sm font-semibold">
          Respond now
          <ArrowRight className="size-3.5" />
        </button>
      </div>

      <div className="flex flex-col justify-between rounded-3xl border border-border bg-card p-5">
        <div className="flex items-start justify-between">
          <p className="text-sm font-medium text-muted-foreground">Today's sessions</p>
          <CalendarClock className="size-[18px] text-muted-foreground" />
        </div>
        <div>
          <p className="font-display text-4xl font-bold text-foreground">
            {stats.todaysSessions}
          </p>
          <p className="text-xs text-muted-foreground">
            {stats.confirmedTotal} confirmed total
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-3xl border border-border bg-card p-5">
        <div className="flex items-start justify-between">
          <p className="text-sm font-medium text-muted-foreground">Earnings</p>
          <Wallet className="size-[18px] text-muted-foreground" />
        </div>
        <div>
          <p className="font-display text-4xl font-bold text-foreground">
            ${stats.earnings}
          </p>
          <p className="flex items-center gap-1 text-xs text-success">
            <ArrowUpRight className="size-3.5" />
            {stats.paidSessions} paid sessions
          </p>
        </div>
      </div>
    </>
  );
}