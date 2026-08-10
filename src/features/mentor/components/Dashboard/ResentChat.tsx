import React from "react";
import { MessageSquare } from "lucide-react";

const chats = [
  {
    name: "John Doe",
    initials: "JD",
    date: "Aug 4",
    preview: "Hi Ava, I just requested 8/4/2026, 2:00:00 PM. Looking forward to it!",
  },
];

export default function ResentChat() {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 lg:col-span-1">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-foreground">Recent chats</h3>
        <MessageSquare className="size-[18px] text-muted-foreground" />
      </div>

      <div className="mt-4 space-y-1">
        {chats.map((chat, idx) => (
          <button
            key={idx}
            className="flex w-full items-start gap-3 rounded-2xl p-2.5 text-left hover:bg-secondary"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
              {chat.initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-semibold text-foreground">{chat.name}</p>
                <span className="shrink-0 text-[11px] text-muted-foreground">{chat.date}</span>
              </div>
              <p className="truncate text-xs text-muted-foreground">{chat.preview}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}