import React, { useState, useMemo } from 'react'
import { Search, Users, CheckCircle2, Wallet, MessageCircle, Calendar, ArrowUpRight } from 'lucide-react'
import MentorSidebar from '../components/MentorSidebar'
import MentorHeader from '../components/MentorHeader'

interface Student {
  id: string
  name: string
  lastActivity: string
  revenue: number
  total: number
  done: number
  upcoming: number
}

const STUDENTS: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    lastActivity: '8/13/2026',
    revenue: 0,
    total: 4,
    done: 0,
    upcoming: 0,
  },
  {
    id: '2',
    name: 'Priya Sharma',
    lastActivity: '8/10/2026',
    revenue: 1200,
    total: 6,
    done: 4,
    upcoming: 2,
  },
  {
    id: '3',
    name: 'Mark Wilson',
    lastActivity: '8/05/2026',
    revenue: 450,
    total: 2,
    done: 1,
    upcoming: 1,
  },
]

function FindStudents() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [query, setQuery] = useState('')

  const filtered = useMemo(
    () => STUDENTS.filter((s) => s.name.toLowerCase().includes(query.trim().toLowerCase())),
    [query]
  )

  const sessionsDelivered = STUDENTS.reduce((sum, s) => sum + s.done, 0)
  const lifetimeRevenue = STUDENTS.reduce((sum, s) => sum + s.revenue, 0)

  return (
    <div className="flex min-h-screen w-full bg-background">
      <MentorSidebar mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <MentorHeader onMenuClick={() => setMobileNavOpen(true)} />
        <main className="flex-1 overflow-x-hidden bg-background p-3 md:p-5">
          <div className="mx-auto max-w-7xl">
            {/* Stats */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all hover:shadow-lg hover:-translate-y-0.5">
                <div
                  className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-30"
                  style={{ background: 'var(--color-violet)' }}
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Total Students
                  </span>
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{ background: 'color-mix(in oklch, var(--color-violet) 16%, transparent)' }}
                  >
                    <Users className="h-4.5 w-4.5" style={{ color: 'var(--color-violet)' }} strokeWidth={2.25} />
                  </div>
                </div>
                <div className="mt-3 font-display text-3xl font-bold text-foreground">
                  {STUDENTS.length}
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all hover:shadow-lg hover:-translate-y-0.5">
                <div
                  className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-30"
                  style={{ background: 'var(--color-amber)' }}
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Sessions Delivered
                  </span>
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{ background: 'color-mix(in oklch, var(--color-amber) 16%, transparent)' }}
                  >
                    <CheckCircle2 className="h-4.5 w-4.5" style={{ color: 'var(--color-amber)' }} strokeWidth={2.25} />
                  </div>
                </div>
                <div className="mt-3 font-display text-3xl font-bold text-foreground">
                  {sessionsDelivered}
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all hover:shadow-lg hover:-translate-y-0.5">
                <div
                  className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-30"
                  style={{ background: 'var(--color-sky)' }}
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Lifetime Revenue
                  </span>
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{ background: 'color-mix(in oklch, var(--color-sky) 16%, transparent)' }}
                  >
                    <Wallet className="h-4.5 w-4.5" style={{ color: 'var(--color-sky)' }} strokeWidth={2.25} />
                  </div>
                </div>
                <div className="mt-3 font-display text-3xl font-bold text-foreground">
                  ${lifetimeRevenue}
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search students by name..."
                className="w-full rounded-2xl border border-border bg-card py-3.5 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-offset-background transition-shadow focus:ring-1 focus:ring-ring"
              />
            </div>

            {/* Student list */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 text-center">
                <Users className="mb-3 h-8 w-8 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">No students found</p>
                <p className="mt-1 text-xs text-muted-foreground">Try a different search term</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((student) => (
                  <div
                    key={student.id}
                    className="group rounded-2xl border border-border bg-card p-5 transition-all hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="gradient-violet flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-primary-foreground shadow-sm">
                          {student.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-display text-base font-semibold text-foreground">
                            {student.name}
                          </h3>
                          <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            Last activity {student.lastActivity}
                          </p>
                        </div>
                      </div>
                      <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
                        ${student.revenue}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <div className="rounded-xl bg-muted px-3 py-2.5 text-center">
                        <div className="font-display text-lg font-bold text-foreground">
                          {student.total}
                        </div>
                        <div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                          Total
                        </div>
                      </div>
                      <div className="rounded-xl bg-muted px-3 py-2.5 text-center">
                        <div className="font-display text-lg font-bold text-success">
                          {student.done}
                        </div>
                        <div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                          Done
                        </div>
                      </div>
                      <div className="rounded-xl bg-muted px-3 py-2.5 text-center">
                        <div className="font-display text-lg font-bold text-info">
                          {student.upcoming}
                        </div>
                        <div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                          Upcoming
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Chat
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default FindStudents