import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  X,
  MessageSquarePlus,
  Bot,
  User as UserIcon,
  Loader2,
} from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Explain closures in JavaScript",
  "Difference between let, const, var?",
  "How does async/await work?",
  "Give me a React useState example",
  "Explain SQL JOINs with examples",
];

// No backend yet — simulate a delay, then always resolve as an error.
// Swap this for a real fetch/server-fn call once the AI endpoint exists.
async function fetchAiReply(_messages: Msg[]): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  throw new Error("AI tutor isn't connected yet — coming soon.");
}

export default function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-ai-tutor", handler);
    return () => window.removeEventListener("open-ai-tutor", handler);
  }, []);

  const send = async (prompt?: string) => {
    const text = (prompt ?? input).trim();
    if (!text || loading) return;
    setError(null);
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setLoading(true);
    try {
      const reply = await fetchAiReply(next);
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setMessages([]);
    setInput("");
    setError(null);
  };

  return (
    <>
      {/* Floating trigger — desktop only, header handles mobile/tablet */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`fixed bottom-5 right-5 z-40 hidden items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:scale-105 lg:flex ${
          open ? "pointer-events-none opacity-0" : ""
        }`}
        aria-label="Open AI tutor"
      >
        <Sparkles className="size-4" />
        Ask AI Tutor
      </button>

      {/* Backdrop on small/medium screens */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Right panel */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-screen w-[92vw] max-w-[420px] flex-col border-l border-border bg-card shadow-2xl transition-transform duration-300 sm:w-[400px] xl:w-[22vw] xl:min-w-[340px] xl:max-w-[440px] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-border bg-gradient-to-r from-primary/10 to-transparent px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display text-sm font-semibold">CodePath Tutor</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                AI · Test what you learned
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={reset}
              title="New chat"
              className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <MessageSquarePlus className="size-4" />
            </button>
            <button
              onClick={() => setOpen(false)}
              title="Close"
              className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-4">
          {messages.length === 0 ? (
            <div className="space-y-4">
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Bot className="size-4 text-primary" /> Hi, I'm your AI tutor
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Ask me anything about JavaScript, React, Node, Python, SQL, MongoDB or Docker.
                  I can quiz you, explain concepts, and review code.
                </p>
              </div>
              <div>
                <div className="mb-2 px-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Try asking
                </div>
                <div className="flex flex-col gap-1.5">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      disabled={loading}
                      className="rounded-lg border border-border bg-secondary/40 px-3 py-2 text-left text-xs text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 disabled:opacity-50"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((m, i) => (
                <div key={i} className="flex gap-2">
                  <div
                    className={`flex size-7 shrink-0 items-center justify-center rounded-md ${
                      m.role === "user"
                        ? "bg-secondary text-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {m.role === "user" ? (
                      <UserIcon className="size-3.5" />
                    ) : (
                      <Bot className="size-3.5" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1 rounded-lg border border-border/60 bg-background/60 p-3">
                    <div className="whitespace-pre-wrap text-sm text-foreground">{m.content}</div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 px-1 text-xs text-muted-foreground">
                  <Loader2 className="size-3.5 animate-spin" /> Thinking…
                </div>
              )}

              {error && (
                <div className="rounded-md border border-destructive/40 bg-destructive/10 p-2 text-xs text-destructive">
                  {error}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="border-t border-border bg-background/60 p-3">
          <div className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Ask a question or paste code…"
              rows={1}
              disabled={loading}
              className="min-h-[44px] max-h-32 flex-1 resize-none rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary/50 disabled:opacity-60"
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground disabled:opacity-40"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
            </button>
          </div>
          <p className="mt-1.5 px-1 text-[10px] text-muted-foreground">
            Enter to send · Shift+Enter for newline
          </p>
        </div>
      </aside>
    </>
  );
}