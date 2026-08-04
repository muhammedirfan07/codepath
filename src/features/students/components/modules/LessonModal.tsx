import { CheckCircle2, Clock, History, Share2, X } from "lucide-react";
import { Link } from "react-router-dom";

export interface LessonDetail {
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  moduleTitle: string;
  watchTarget: string;
  transcript: { time: string; text: string }[];
  bestExplanation: { summary: string; points: string[] };
  example: { language: string; code: string };
}

interface LessonModalProps {
  lesson: LessonDetail;
  fullPageHref: string;
  onClose: () => void;
  onNext: () => void;
}

const LessonModal=({
  lesson,
  fullPageHref,
  onClose,
  onNext,
}: LessonModalProps)=> {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* top bar */}
        <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-secondary px-2 py-0.5 font-medium text-secondary-foreground">
              {lesson.difficulty}
            </span>
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" /> {lesson.duration}
            </span>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary">
              Topic video
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          <h2 className="text-xl font-bold text-foreground">{lesson.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {lesson.description}
          </p>

          {/* video card */}
          <div className="mt-5 overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-between bg-secondary px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Video lesson · {lesson.moduleTitle}
                </p>
                <p className="text-xs text-muted-foreground">
                  Watch to {lesson.watchTarget} to auto-complete this lesson
                </p>
              </div>
            </div>

            <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-indigo-950">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-red-600 shadow-lg">
                  ▶
                </div>
              </div>
              <div className="absolute bottom-3 left-3 flex gap-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white">
                  <Share2 className="h-4 w-4" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white">
                  <History className="h-4 w-4" />
                </button>
              </div>
              <button className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold text-white">
                Watch on YouTube
              </button>
            </div>

            <div className="flex items-center justify-between px-4 py-2 text-xs text-muted-foreground">
              <span>0:00 / {lesson.watchTarget}</span>
              <span>0% of lesson segment</span>
            </div>
            <div className="mx-4 mb-3 h-1 overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-0 rounded-full bg-primary" />
            </div>
          </div>

          {/* transcript */}
          <div className="mt-5 rounded-xl border border-border p-4">
            <p className="text-sm font-medium text-foreground">
              Transcript{" "}
              <span className="font-normal text-muted-foreground">
                · click a timestamp to jump
              </span>
            </p>
            <div className="mt-2 space-y-1">
              {lesson.transcript.map((row, i) => (
                <div
                  key={row.time}
                  className={`flex items-center hover:bg-secondary gap-3 cursor-pointer rounded-lg px-2 py-1.5 text-sm ${i === 0 ? "bg-primary/10" : ""}`}
                >
                  <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-secondary-foreground">
                    {row.time}
                  </span>
                  <span className="text-foreground">{row.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* best explanation */}
          <div className="mt-5 rounded-xl border border-border p-4">
            <p className="text-sm font-medium text-foreground">
              Best explanation
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {lesson.bestExplanation.summary}
            </p>
            <ul className="mt-3 space-y-1.5">
              {lesson.bestExplanation.points.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2 text-sm text-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />{" "}
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* example */}
          <div className="mt-5 overflow-hidden rounded-xl border border-editor-line bg-editor">
            <p className="border-b border-editor-line px-4 py-2 text-xs font-medium text-muted-foreground">
              Example · {lesson.example.language}
            </p>
            <pre className="overflow-x-auto p-4 font-mono text-sm text-editor-foreground">
              <code>{lesson.example.code}</code>
            </pre>
          </div>
        </div>

        {/* footer */}
        <div className="flex shrink-0 items-center justify-between border-t border-border px-6 py-4">
          <Link
             to={fullPageHref}
            state={{ lesson, backHref: "/student/modules/react" }}
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Open full lesson page
          </Link>
          <button
            onClick={onNext}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Next lesson →
          </button>
        </div>
      </div>
    </div>
  );
}
export default LessonModal
