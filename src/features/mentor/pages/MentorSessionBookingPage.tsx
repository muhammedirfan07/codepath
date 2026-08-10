import React, { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import MentorSidebar from '../components/MentorSidebar'
import MentorHeader from '../components/MentorHeader'

type BookingStatus = 'pending' | 'confirmed' | 'past'

interface Booking {
  id: string
  studentName: string
  date: string
  duration: number
  sessionType: string
  note?: string
  price: number
  cancelled?: boolean
}

const CONFIRMED_BOOKINGS: Booking[] = [
  {
    id: '1',
    studentName: 'John Doe',
    date: '8/3/2026, 10:00:00 AM',
    duration: 60,
    sessionType: '1:1 mentoring session',
    price: 63,
  },
  {
    id: '2',
    studentName: 'John Doe',
    date: '7/27/2026, 9:00:00 AM',
    duration: 60,
    sessionType: 'ff',
    note: 'cvv',
    price: 60,
  },
  {
    id: '3',
    studentName: 'John  gDoe',
    date: '7/27/2026, 9:00:00 AM',
    duration: 60,
    sessionType: 'ff',
    note: 'cvv',
    price: 60,
  },
  {
    id: '4',
    studentName: 'John  eeDoe',
    date: '7/27/2026, 9:00:00 AM',
    duration: 60,
    sessionType: 'ff',
    note: 'cvv',
    price: 60,
  },
  {
    id: '5',
    studentName: 'John  eddeDoe',
    date: '7/27/2026, 9:00:00 AM',
    duration: 60,
    sessionType: 'ff',
    note: 'cvv',
    price: 60,
  },
]

const PAST_BOOKINGS: Booking[] = [
  {
    id: '3',
    studentName: 'John Doe',
    date: '8/13/2026, 9:00:00 AM',
    duration: 60,
    sessionType: '1:1 mentoring session',
    price: 63,
    cancelled: true,
  },
  {
    id: '4',
    studentName: 'John Doe',
    date: '8/4/2026, 2:00:00 PM',
    duration: 60,
    sessionType: '1:1 mentoring session',
    price: 63,
    cancelled: true,
  },
]

const PENDING_BOOKINGS: Booking[] = []

const PAGE_SIZE = 4

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

function StatCard({
  label,
  value,
  dotClassName,
}: {
  label: string
  value: number
  dotClassName: string
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        <span className={`h-2.5 w-2.5 rounded-full ${dotClassName}`} />
      </div>
      <div className="mt-3 font-display text-3xl font-bold text-foreground">
        {value}
      </div>
    </div>
  )
}

function BookingRow({ booking, status }: { booking: Booking; status: BookingStatus }) {
  return (
    <div className="border text-card-foreground mb-2 flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4 shadow-sm transition-shadow hover:shadow-md border-primary/30 bg-primary/5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber font-display text-sm font-semibold text-amber-foreground">
          {getInitials(booking.studentName)}
        </div>
        <div>
          <p className="font-medium text-foreground">{booking.studentName}</p>
          <p className="text-sm text-muted-foreground">
            {booking.date} · {booking.duration}min · {booking.sessionType}
          </p>
          {booking.note && (
            <p className="text-sm text-muted-foreground">Note: {booking.note}</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        <span className="inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary shadow hover:bg-primary/80 rounded-full gradient-sky text-white">
          ${booking.price}
        </span>

        {status === 'confirmed' && (
          <>
            <button className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
              Chat
            </button>
            <button className="rounded-full bg-success px-4 py-1.5 text-sm font-medium text-success-foreground transition-opacity hover:opacity-90">
              Video call
            </button>
            <button className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
              Complete
            </button>
          </>
        )}

        {status === 'past' && booking.cancelled && (
          <span className="rounded-full bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground">
            Cancelled
          </span>
        )}
      </div>
    </div>
  )
}

function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-end gap-1 border-t border-border px-4 py-3">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary disabled:opacity-40 disabled:hover:bg-transparent"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
            p === page
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-secondary'
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary disabled:opacity-40 disabled:hover:bg-transparent"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}

const TABS: { key: BookingStatus; label: string; data: Booking[] }[] = [
  { key: 'pending', label: 'Pending', data: PENDING_BOOKINGS },
  { key: 'confirmed', label: 'Confirmed', data: CONFIRMED_BOOKINGS },
  { key: 'past', label: 'Past', data: PAST_BOOKINGS },
]

function MentorSessionBookingPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<BookingStatus>('pending')
  const [page, setPage] = useState(1)

  const fullData = TABS.find((t) => t.key === activeTab)?.data ?? []
  const totalPages = Math.max(1, Math.ceil(fullData.length / PAGE_SIZE))

  const activeData = useMemo(
    () => fullData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [fullData, page]
  )

  function handleTabChange(tab: BookingStatus) {
    setActiveTab(tab)
    setPage(1)
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <MentorSidebar mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <MentorHeader onMenuClick={() => setMobileNavOpen(true)} />
        <main className="flex-1 overflow-x-hidden bg-background p-3 md:p-5">
          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Bookings
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Confirm requests and join your sessions
            </p>
          </div>

          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard
              label="Awaiting reply"
              value={PENDING_BOOKINGS.length}
              dotClassName="bg-warning"
            />
            <StatCard
              label="Confirmed"
              value={CONFIRMED_BOOKINGS.length}
              dotClassName="bg-success"
            />
            <StatCard
              label="History"
              value={PAST_BOOKINGS.length}
              dotClassName="bg-success"
            />
          </div>

          <div className="mb-4 inline-flex gap-1 rounded-full bg-muted p-1">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label} ({tab.data.length})
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-card">
            <div className="p-4">
              {activeData.length === 0 ? (
                <div className="flex items-center justify-center p-10 text-sm text-muted-foreground">
                  No bookings in this group.
                </div>
              ) : (
                activeData.map((booking) => (
                  <BookingRow key={booking.id} booking={booking} status={activeTab} />
                ))
              )}
            </div>

            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </main>
      </div>
    </div>
  )
}

export default MentorSessionBookingPage