import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Video, X, AlertTriangle } from "lucide-react";

// ---- Types ------------------------------------------------------------------
type BookingStatus = "confirmed" | "pending" | "completed";

interface Booking {
  id: string;
  mentorName: string;
  initials: string;
  dateLabel: string;
  topic: string;
  status: BookingStatus;
}

type TabKey = "upcoming" | "pending" | "past";

// ---- Mock data — swap this for your real bookings API -----------------------
const UPCOMING: Booking[] = [
  {
    id: "bk-1",
    mentorName: "Ava Chen",
    initials: "AV",
    dateLabel: "8/3/2026, 10:00:00 AM",
    topic: "1:1 mentoring session",
    status: "confirmed",
  },
  {
    id: "bk-2",
    mentorName: "Ava Chen",
    initials: "AV",
    dateLabel: "7/27/2026, 9:00:00 AM",
    topic: "ff",
    status: "confirmed",
  },
];

const PENDING: Booking[] = [
  {
    id: "bk-3",
    mentorName: "Diego Alvarez",
    initials: "DI",
    dateLabel: "8/6/2026, 9:00:00 AM",
    topic: "Algorithms review",
    status: "pending",
  },
];

const PAST: Booking[] = [
  {
    id: "bk-4",
    mentorName: "Ava Chen",
    initials: "AV",
    dateLabel: "7/10/2026, 10:00:00 AM",
    topic: "1:1 mentoring session",
    status: "completed",
  },
  {
    id: "bk-5",
    mentorName: "Diego Alvarez",
    initials: "DI",
    dateLabel: "6/20/2026, 2:00:00 PM",
    topic: "Mock interview",
    status: "completed",
  },
  {
    id: "bk-6",
    mentorName: "Ava Chen",
    initials: "AV",
    dateLabel: "5/15/2026, 11:00:00 AM",
    topic: "Career chat",
    status: "completed",
  },
];

// ---- Status badge -------------------------------------------------------------
function StatusBadge({ status }: { status: BookingStatus }) {
  const styles: Record<BookingStatus, string> = {
    confirmed: "border-border bg-transparent text-foreground",
    pending: "border-warning/40 bg-warning/10 text-warning-foreground",
    completed: "border-border bg-muted text-muted-foreground",
  };
  const label: Record<BookingStatus, string> = {
    confirmed: "Confirmed",
    pending: "Pending",
    completed: "Completed",
  };
  return (
    <span
      className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold sm:text-sm ${styles[status]}`}
    >
      {label[status]}
    </span>
  );
}

// ---- Cancel confirmation modal ------------------------------------------------
interface CancelModalProps {
  booking: Booking;
  isSubmitting: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

function CancelBookingModal({
  booking,
  isSubmitting,
  onConfirm,
  onClose,
}: CancelModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cancel-booking-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-full rounded-t-2xl border border-border bg-card p-5 shadow-xl sm:max-w-md sm:rounded-2xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertTriangle className="h-5 w-5" />
            </span>
            <h2
              id="cancel-booking-title"
              className="font-display text-lg font-semibold text-foreground"
            >
              Cancel booking?
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-4 text-sm text-muted-foreground sm:text-base">
          Are you sure you want to cancel your session with{" "}
          <span className="font-medium text-foreground">
            {booking.mentorName}
          </span>{" "}
          on{" "}
          <span className="font-medium text-foreground">
            {booking.dateLabel}
          </span>
          ? This action can&apos;t be undone.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-full rounded-full border border-input bg-secondary px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-50 sm:w-auto"
          >
            Keep booking
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="w-full rounded-full bg-destructive px-4 py-2.5 text-sm font-medium text-destructive-foreground transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-auto"
          >
            {isSubmitting ? "Cancelling..." : "Yes, cancel"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- Booking row -------------------------------------------------------------
interface BookingRowProps {
  booking: Booking;
  onChat: (booking: Booking) => void;
  onVideoCall: (booking: Booking) => void;
  onCancel: (booking: Booking) => void;
}

function BookingRow({ booking, onChat, onVideoCall, onCancel }: BookingRowProps) {
  return (
    <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-6 sm:py-5">
      <div className="min-w-0">
        <p className="truncate font-display font-semibold text-foreground">
          {booking.mentorName}
        </p>
        <p className="truncate text-sm text-muted-foreground">
          {booking.dateLabel} · {booking.topic}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
        <StatusBadge status={booking.status} />

        <button
          type="button"
          onClick={() => onChat(booking)}
          className="flex items-center gap-1.5 rounded-full border border-input bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <MessageSquare className="h-4 w-4" />
          Chat
        </button>

        {booking.status !== "pending" && (
          <button
            type="button"
            onClick={() => onVideoCall(booking)}
            className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Video className="h-4 w-4" />
            Video call
          </button>
        )}

        {booking.status === "pending" && (
          <button
            type="button"
            onClick={() => onCancel(booking)}
            className="flex items-center gap-1.5 rounded-full border border-destructive/40 bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20"
          >
            <X className="h-4 w-4" />
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

// ---- Empty state -------------------------------------------------------------
function EmptyBookings({ tab }: { tab: TabKey }) {
  const copy: Record<TabKey, string> = {
    upcoming: "No upcoming sessions yet.",
    pending: "No pending requests right now.",
    past: "No past sessions yet.",
  };
  return (
    <p className="px-6 py-10 text-center text-sm text-muted-foreground">
      {copy[tab]}
    </p>
  );
}

// ---- Root ----------------------------------------------------------------
function MyBookingPanel() {
  const [activeTab, setActiveTab] = useState<TabKey>("upcoming");
  const [pendingBookings, setPendingBookings] = useState<Booking[]>(PENDING);
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const navigate = useNavigate();

  const tabs = useMemo(
    () => [
      { key: "upcoming" as TabKey, label: "Upcoming", bookings: UPCOMING },
      { key: "pending" as TabKey, label: "Pending", bookings: pendingBookings },
      { key: "past" as TabKey, label: "Past", bookings: PAST },
    ],
    [pendingBookings]
  );

  const currentBookings = useMemo(
    () => tabs.find((t) => t.key === activeTab)?.bookings ?? [],
    [tabs, activeTab]
  );

  const handleChat = (_booking: Booking) => {
    // Adjust to match your messages route.
    navigate("/messages");
  };

  const handleVideoCall = (booking: Booking) => {
    // Adjust to match your video-session route.
    navigate(`/messages/call/${booking.id}`, {
      state: { name: booking.mentorName, initials: booking.initials },
    });
  };

  const handleCancelClick = (booking: Booking) => {
    setCancelTarget(booking);
  };

  const handleCloseModal = () => {
    if (isCancelling) return;
    setCancelTarget(null);
  };

  const handleConfirmCancel = async () => {
    if (!cancelTarget) return;
    setIsCancelling(true);
    try {
      // TODO: replace with your real cancel-booking API call, e.g.:
      // await api.delete(`/bookings/${cancelTarget.id}`);
      setPendingBookings((prev) =>
        prev.filter((b) => b.id !== cancelTarget.id)
      );
      setCancelTarget(null);
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <>
      <h1 className="font-display text-3xl font-bold text-foreground">
        My bookings
      </h1>
      <p className="mt-1 text-muted-foreground">
        Sessions you&apos;ve requested and confirmed.
      </p>

      {/* Tabs */}
      <div className="mt-6 flex w-full max-w-full gap-1 overflow-x-auto rounded-full bg-muted p-1 sm:inline-flex sm:w-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label} ({tab.bookings.length})
          </button>
        ))}
      </div>

      {/* List */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
        {currentBookings.length === 0 ? (
          <EmptyBookings tab={activeTab} />
        ) : (
          <div className="divide-y divide-border">
            {currentBookings.map((booking) => (
              <BookingRow
                key={booking.id}
                booking={booking}
                onChat={handleChat}
                onVideoCall={handleVideoCall}
                onCancel={handleCancelClick}
              />
            ))}
          </div>
        )}
      </div>

      {cancelTarget && (
        <CancelBookingModal
          booking={cancelTarget}
          isSubmitting={isCancelling}
          onConfirm={handleConfirmCancel}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default MyBookingPanel;