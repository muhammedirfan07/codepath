import React, { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";

export interface SessionCallViewProps {
  name: string;
  initials: string;
  onLeave: () => void;
}

function formatDuration(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function SessionCallView({
  name,
  initials,
  onLeave,
}: SessionCallViewProps) {
  const [seconds, setSeconds] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [cameraError, setCameraError] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Call timer
  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Local camera preview — falls back to a mock-room message if unavailable/denied.
  useEffect(() => {
    if (!camOn) {
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
  }, [camOn]);

  // Stop the camera for good when the page/component unmounts (e.g. user leaves).
  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, []);

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-editor-line bg-editor text-editor-foreground shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-editor-line px-4 py-3 sm:px-5">
        <p className="truncate text-sm font-medium text-editor-foreground/90">
          Session with <span className="font-semibold">{name}</span>
        </p>
        <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-xs text-editor-foreground/90">
          {formatDuration(seconds)}
        </span>
      </div>

      {/* Video tiles */}
      <div className="grid grid-cols-1 gap-px bg-editor-line sm:grid-cols-2">
        {/* Peer tile (mock) */}
        <div className="relative flex min-h-[260px] flex-col items-center justify-center gap-3 bg-editor sm:min-h-[380px]">
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
        <div className="relative flex min-h-[260px] items-center justify-center bg-editor sm:min-h-[380px]">
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
          onClick={onLeave}
          className="flex items-center gap-2 rounded-full bg-destructive px-5 py-2.5 text-sm font-semibold text-destructive-foreground transition-opacity hover:opacity-90"
        >
          <PhoneOff className="h-4 w-4" />
          Leave
        </button>
      </div>
    </div>
  );
}