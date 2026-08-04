import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, MessageSquare, Video } from 'lucide-react'
import type { Mentor } from '../Find_Mentor/mentorr'
import { availableDays, slotsByDay, defaultSlots } from '../Find_Mentor/mockMentors'

interface Props {
  mentor: Mentor
}

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

export default function BookingCalendar({ mentor }: Props) {
  const [monthLabel] = useState('August 2026')
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [topic, setTopic] = useState('React hooks review')
  const [note, setNote] = useState('')
  const [booked, setBooked] = useState(false)

  // Aug 2026 starts on a Saturday -> 6 leading blanks before day 1
  const leadingBlanks = 6
  const daysInMonth = 31
  const cells = [...Array(leadingBlanks).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]

  const slots = selectedDay ? slotsByDay[selectedDay] ?? defaultSlots : []
  const grouped = slots.reduce<Record<string, typeof slots>>((acc, s) => {
    acc[s.period] = acc[s.period] ? [...acc[s.period], s] : [s]
    return acc
  }, {})

  const handleBook = () => {
    if (!selectedDay || !selectedTime) return
    setBooked(true)
  }

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow overflow-hidden p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Book an Appointment</h3>
      </div>

      <div className="mb-3 flex items-center justify-between">
        <span className="font-medium text-foreground">{monthLabel}</span>
        <div className="flex gap-1">
          <button className="rounded-md p-1 text-muted-foreground hover:bg-secondary">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="rounded-md p-1 text-muted-foreground hover:bg-secondary">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mb-1 grid grid-cols-7 text-center text-[11px] font-medium text-muted-foreground">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center text-sm">
        {cells.map((day, i) => {
          if (day === null) return <div key={i} />
          const isAvailable = availableDays.includes(day)
          const isSelected = selectedDay === day
          return (
            <button
              key={i}
              disabled={!isAvailable}
              onClick={() => {
                setSelectedDay(day)
                setSelectedTime(null)
                setBooked(false)
              }}
              className={`mx-auto flex h-8 w-8 flex-col items-center justify-center rounded-full text-xs transition-colors ${
                isSelected
                  ? 'bg-primary font-semibold text-primary-foreground'
                  : isAvailable
                  ? 'text-foreground hover:bg-secondary'
                  : 'cursor-default text-muted-foreground/40'
              }`}
            >
              {day}
              {isAvailable && !isSelected && <span className="mt-0.5 h-1 w-1 rounded-full bg-primary" />}
            </button>
          )
        })}
      </div>

      <div className="mt-5">
        <div className="mb-2 text-sm font-medium text-foreground">Time</div>
        {!selectedDay && <p className="text-xs text-muted-foreground">Pick a highlighted day above.</p>}
        {selectedDay &&
          Object.entries(grouped).map(([period, periodSlots]) => (
            <div key={period} className="mb-3">
              <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {period}
              </div>
              <div className="flex flex-wrap gap-2">
                {periodSlots.map((s) => (
                  <button
                    key={s.time}
                    onClick={() => setSelectedTime(s.time)}
                    className={`rounded-lg border px-3 py-1.5 text-sm ${
                      selectedTime === s.time
                        ? 'border-primary bg-accent text-accent-foreground'
                        : 'border-border text-foreground hover:bg-secondary'
                    }`}
                  >
                    {s.time}
                  </button>
                ))}
              </div>
            </div>
          ))}
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-sm font-medium text-foreground">Topic</label>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-sm font-medium text-foreground">Note (optional)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Session fee</span>
        <span className="font-semibold text-foreground">${mentor.hourlyRate.toFixed(2)}</span>
      </div>

      <button
        onClick={handleBook}
        disabled={!selectedDay || !selectedTime}
        className="mt-4 w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-40"
      >
        Book Now
      </button>

      {booked && (
        <div className="mt-4 border-t border-border pt-4">
          <div className="flex gap-2">
            <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-sm text-foreground hover:bg-secondary">
              <MessageSquare className="h-4 w-4" /> Message
            </button>
            <button
              disabled
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-sm text-muted-foreground opacity-50"
            >
              <Video className="h-4 w-4" /> Video call
            </button>
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Video calls unlock once the mentor confirms your booking.
          </p>
        </div>
      )}
    </div>
  )
}