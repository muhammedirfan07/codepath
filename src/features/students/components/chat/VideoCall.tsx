import React, { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff, X } from "lucide-react";

export interface VideoCall {
  open: boolean;
  onClose: () => void;
  name: string;
  initials: string;
}

function formatDuration(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function VideoCall({
  open,
  onClose,
  name,
  initials,
}: VideoCall) {
  const [seconds, setSeconds] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [cameraError, setCameraError] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Call timer
  useEffect(() => {
    if (!open) return;
    setSeconds(0);
    intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [open]);

  // Local camera preview — falls back to a mock-room message if unavailable/denied.
  useEffect(() => {
    if (!open || !camOn) {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      return;
    }

    let cancelled = false;
    setCameraError(false);

    navigator.mediaDevices
      ?.getUserMedia({ video: true, audio: false })
      .then((stream) => {
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(() => {
        if (!cancelled) setCameraError(true);
      });

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, [open, camOn]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const handleClose = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-0 backdrop-blur-sm sm:p-6 lg:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={`Video call with ${name}`}
    >
      <div className="flex h-full w-full max-w-6xl flex-col overflow-hidden bg-editor text-editor-foreground shadow-2xl sm:h-auto sm:max-h-190vh] sm:rounded-2xl sm:border sm:border-editor-line">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-editor-line px-4 py-3 sm:px-5">
          <p className="truncate text-sm font-medium text-editor-foreground/90">
            Session with <span className="font-semibold">{name}</span>
          </p>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-xs text-editor-foreground/90">
              {formatDuration(seconds)}
            </span>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              className="flex h-8 w-8 items-center justify-center rounded-full text-editor-foreground/70 hover:bg-white/10 hover:text-editor-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Video tiles */}
        <div className="grid flex-1 min-h-0 grid-cols-1 gap-px bg-editor-line sm:grid-cols-2">
          {/* Peer tile (mock) */}
          <div className="relative flex min-h-[220px] flex-col items-center justify-center gap-3 bg-editor">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground sm:h-24 sm:w-24">
              {initials}
            </div>
            <div className="text-center">
              <p className="font-display font-semibold text-editor-foreground">
                {name}
              </p>
              <p className="text-xs text-editor-foreground/60">
                Peer video (mock)
              </p>
            </div>
          </div>

          {/* Self tile */}
          <div className="relative flex min-h-[220px] items-center justify-center bg-editor">
            {camOn && !cameraError ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <p className="max-w-[80%] text-center text-sm text-editor-foreground/60">
                Camera/mic not available (this is a mock room).
              </p>
            )}
            <span className="absolute bottom-3 left-3 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white">
              You (you)
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 border-t border-editor-line px-4 py-4 sm:px-5">
          <button
            type="button"
            onClick={() => setMicOn((v) => !v)}
            aria-pressed={!micOn}
            aria-label={micOn ? "Mute microphone" : "Unmute microphone"}
            className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
              micOn
                ? "bg-white/10 text-editor-foreground hover:bg-white/15"
                : "bg-white text-editor"
            }`}
          >
            {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </button>

          <button
            type="button"
            onClick={() => setCamOn((v) => !v)}
            aria-pressed={!camOn}
            aria-label={camOn ? "Turn camera off" : "Turn camera on"}
            className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
              camOn
                ? "bg-white/10 text-editor-foreground hover:bg-white/15"
                : "bg-white text-editor"
            }`}
          >
            {camOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="flex items-center gap-2 rounded-full bg-destructive px-5 py-2.5 text-sm font-semibold text-destructive-foreground transition-opacity hover:opacity-90"
          >
            <PhoneOff className="h-4 w-4" />
            Leave
          </button>
        </div>
      </div>
    </div>
  );
}