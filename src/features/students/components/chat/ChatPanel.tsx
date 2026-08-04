import React, { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Phone,
  Video,
  Smile,
  Paperclip,
  Send,
  ArrowLeft,
  SendHorizontal,
} from "lucide-react";
import VoiceCallModal from "./AudioCall";

// ---- Types ----------------------------------------------------------------
interface ChatMessage {
  id: number;
  from: "me" | "them";
  text: string;
  time: string;
  day: string;
}

interface Chat {
  id: string;
  name: string;
  initials: string;
  online: boolean;
  messages: ChatMessage[];
}

interface DayGroup {
  day: string;
  messages: ChatMessage[];
}

// ---- Mock data — swap this for your real API/socket data ----------------
const INITIAL_CHATS: Chat[] = [
  {
    id: "ava-chen",
    name: "Ava Chen",
    initials: "AV",
    online: true,
    messages: [
      { id: 1, from: "me", text: "hayy", time: "10:12 AM", day: "Jul 25" },
      {
        id: 2,
        from: "me",
        text: "Hi Ava, I just booked 7/27/2026, 9:00:00 AM — topic: ff.",
        time: "10:32 AM",
        day: "Jul 25",
      },
      { id: 3, from: "them", text: "hyy", time: "10:33 AM", day: "Jul 25" },
      {
        id: 4,
        from: "me",
        text: "Hi Ava, I just requested 8/3/2026, 10:00:00 AM. Looking forward to it!",
        time: "12:57 AM",
        day: "Aug 2",
      },
      { id: 5, from: "them", text: "hyy", time: "12:59 AM", day: "Aug 2" },
      { id: 6, from: "me", text: "hyyy", time: "01:00 AM", day: "Aug 2" },
    ],
  },
  {
    id: "diego-alvarez",
    name: "Diego Alvarez",
    initials: "DI",
    online: true,
    messages: [
      {
        id: 1,
        from: "me",
        text: "Hi Diego, I just requested 8/6/2026, 9:00:00 AM. Looking forward to it!",
        time: "9:14 AM",
        day: "Aug 2",
      },
    ],
  },
];

function lastMessagePreview(chat: Chat): string {
  const last = chat.messages[chat.messages.length - 1];
  return last ? last.text : "No messages yet";
}

// Groups a flat message list into { day, messages: [] } buckets, in order.
function groupByDay(messages: ChatMessage[]): DayGroup[] {
  const groups: DayGroup[] = [];
  for (const msg of messages) {
    const group = groups[groups.length - 1];
    if (group && group.day === msg.day) {
      group.messages.push(msg);
    } else {
      groups.push({ day: msg.day, messages: [msg] });
    }
  }
  return groups;
}

// ---- Avatar ----------------------------------------------------------------
interface AvatarProps {
  initials: string;
  online: boolean;
}

function Avatar({ initials, online }: AvatarProps) {
  return (
    <div className="relative shrink-0">
      <div className="relative flex h-11 w-11 shrink-0 overflow-hidden rounded-full">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
          {initials}
        </div>
      </div>
      {online && (
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-emerald-500" />
      )}
    </div>
  );
}

// ---- Chat list item ---------------------------------------------------------
interface ChatListItemProps {
  chat: Chat;
  active: boolean;
  onSelect: (id: string) => void;
}

function ChatListItem({ chat, active, onSelect }: ChatListItemProps) {
  const last = chat.messages[chat.messages.length - 1];
  return (
    <button
      type="button"
      onClick={() => onSelect(chat.id)}
      className={`flex w-full items-center gap-3 px-3 py-3 text-left transition-colors ${
        active ? "bg-accent" : "hover:bg-accent/60"
      }`}
    >
      <Avatar initials={chat.initials} online={chat.online} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-semibold text-foreground">
            {chat.name}
          </p>
          {last && (
            <span className="shrink-0 text-[10px] font-medium text-muted-foreground">
              {last.time}
            </span>
          )}
        </div>
        <p className="truncate text-xs text-muted-foreground">
          {lastMessagePreview(chat)}
        </p>
      </div>
    </button>
  );
}

// ---- Message bubble ----------------------------------------------------------
interface MessageBubbleProps {
  message: ChatMessage;
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isMe = message.from === "me";
  return (
    <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
      <div
        className={`max-w-[75%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2 text-sm leading-relaxed sm:max-w-[65%] ${
          isMe
            ? "rounded-br-sm bg-primary text-primary-foreground"
            : "rounded-bl-sm border border-border bg-card text-foreground shadow-sm"
        }`}
      >
        {message.text}
      </div>
      <span className="mt-1 px-1 text-xs text-muted-foreground">
        {message.time}
      </span>
    </div>
  );
}

// ---- Day divider --------------------------------------------------------------
interface DayDividerProps {
  label: string;
}

function DayDivider({ label }: DayDividerProps) {
  return (
    <div className="my-2 flex items-center justify-center">
      <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

// ---- Empty state ----------------------------------------------------------------
function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent">
        <SendHorizontal className="h-6 w-6 -rotate-45 text-primary" />
      </div>
      <p className="text-sm font-medium">
        Your messages
      </p>
      <p className="max-w-xs text-xs text-muted-foreground">
        Pick a conversation from the left to start chatting.
      </p>
    </div>
  );
}

// ---- Message thread ----------------------------------------------------------------
interface MessageThreadProps {
  chat: Chat;
  onBack: () => void;
  onStartVoiceCall: () => void;
  onStartVideoCall: () => void;
}

function MessageThread({
  chat,
  onBack,
  onStartVoiceCall,
  onStartVideoCall,
}: MessageThreadProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState<string>("");
  const grouped = useMemo(() => groupByDay(chat.messages), [chat.messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [chat.id, chat.messages.length]);

  const handleSend = () => {
    if (!draft.trim()) return;
    // Wire this up to your send-message mutation / socket emit.
    setDraft("");
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={onBack}
          className="-ml-1 flex h-9 w-9 items-center justify-center rounded-full text-foreground hover:bg-muted md:hidden"
          aria-label="Back to chats"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <Avatar initials={chat.initials} online={chat.online} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-display font-semibold text-foreground">
            {chat.name}
          </p>
          <p className="text-xs text-success">
            {chat.online ? "online" : "offline"}
          </p>
        </div>
        <button
          type="button"
          onClick={onStartVoiceCall}
          className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Start voice call"
        >
          <Phone className="h-[18px] w-[18px] text-violet" />
        </button>
        <button
          type="button"
          onClick={onStartVideoCall}
          className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Start video call"
        >
          <Video className="h-[18px] w-[18px] text-violet" />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto px-4 py-4 sm:px-6"
      >
        {grouped.map((group) => (
          <div key={group.day}>
            <DayDivider label={group.day} />
            <div className="flex flex-col gap-3">
              {group.messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Composer */}
      <div className="flex items-center gap-2 border-t border-border px-3 py-3 sm:px-4">
        <button
          type="button"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Emoji"
        >
          <Smile className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Attach file"
        >
          <Paperclip className="h-5 w-5" />
        </button>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          type="text"
          placeholder="Type a message..."
          className="min-w-0 flex-1 rounded-full border border-input bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={!draft.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
          aria-label="Send message"
        >
          <Send className="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  );
}

// ---- Root ----------------------------------------------------------------
export default function ChatPanel() {
  const [chats] = useState<Chat[]>(INITIAL_CHATS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const [voiceCallOpen, setVoiceCallOpen] = useState(false);
  const navigate = useNavigate();

  const filteredChats = useMemo(() => {
    if (!query.trim()) return chats;
    const q = query.toLowerCase();
    return chats.filter((c) => c.name.toLowerCase().includes(q));
  }, [chats, query]);

  const selectedChat = chats.find((c) => c.id === selectedId) || null;

  // Video call is a full page, not a modal — adjust the path to match
  // wherever you register <VideoSessionPage /> in your router.
  const goToVideoCall = (chat: Chat) => {
    navigate(`/student/chats/${chat.id}`, {
      state: { name: chat.name, initials: chat.initials },
    });
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] min-h-[560px] w-full overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
      {/* Chats list */}
      <div
        className={`${
          selectedChat ? "hidden md:flex" : "flex"
        } w-full flex-col border-border md:w-[340px] md:border-r`}
      >
        <div className="border-b border-b-accent">
          <div className="flex items-center justify-between px-4 pt-4 sm:px-5">
            <h2 className="font-display text-xl font-bold text-foreground">
              Chats
            </h2>
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-accent px-2 text-xs font-semibold text-accent-foreground">
              {chats.length}
            </span>
          </div>

          <div className="px-4 py-3 sm:px-5">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search conversations"
                className="w-full rounded-full border border-input bg-secondary py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto pb-4">
          {filteredChats.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">
              No conversations found.
            </p>
          ) : (
            <div className="flex flex-col gap-1">
              {filteredChats.map((chat) => (
                <ChatListItem
                  key={chat.id}
                  chat={chat}
                  active={chat.id === selectedId}
                  onSelect={setSelectedId}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Thread / empty state */}
      <div
        className={`${
          selectedChat ? "flex" : "hidden md:flex"
        } min-h-0 flex-1 flex-col`}
      >
        {selectedChat ? (
          <MessageThread
            chat={selectedChat}
            onBack={() => setSelectedId(null)}
            onStartVoiceCall={() => setVoiceCallOpen(true)}
            onStartVideoCall={() => goToVideoCall(selectedChat)}
          />
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Voice call stays a lightweight modal */}
      {selectedChat && (
        <VoiceCallModal
          open={voiceCallOpen}
          onClose={() => setVoiceCallOpen(false)}
          name={selectedChat.name}
          initials={selectedChat.initials}
          onSwitchToVideo={() => {
            setVoiceCallOpen(false);
            goToVideoCall(selectedChat);
          }}
        />
      )}
    </div>
  );
}