import React, { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff, X } from "lucide-react";

export interface AudioCallModalProps {
  open: boolean;
  onClose: () => void;
  name: string;
  initials: string;
  /** Called if the person taps the video icon mid-call — hand off to a video call instead. */
  onSwitchToVideo?: () => void;
}

function formatDuration(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function AudioCallModal({
  open,
  onClose,
  name,
  initials,
  onSwitchToVideo,
}: AudioCallModalProps) {
  const [seconds, setSeconds] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!open) return;
    setSeconds(0);
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Voice call with ${name}`}
      onClick={onClose}
    >
      <div
        className="gradient-violet relative w-full max-w-sm overflow-hidden rounded-3xl p-8 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
          Voice call
        </p>

        <div className="mx-auto mt-6 flex h-28 w-28 items-center justify-center rounded-full bg-white/20 text-3xl font-bold text-white">
          {initials}
        </div>

        <p className="mt-5 font-display text-2xl font-bold text-white">
          {name}
        </p>
        <p className="mt-1 font-mono text-sm text-white/80">
          {formatDuration(seconds)}
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setMicOn((v) => !v)}
            aria-pressed={!micOn}
            aria-label={micOn ? "Mute microphone" : "Unmute microphone"}
            className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
              micOn
                ? "bg-white/20 text-white hover:bg-white/30"
                : "bg-white text-violet"
            }`}
          >
            {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </button>

          <button
            type="button"
            onClick={() => {
              setCamOn(true);
              onSwitchToVideo?.();
            }}
            aria-label="Switch to video"
            className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
              camOn
                ? "bg-white text-violet"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            {camOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="End call"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive text-destructive-foreground transition-colors hover:opacity-90"
          >
            <PhoneOff className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}