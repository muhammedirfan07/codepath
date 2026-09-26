import React, { useState } from 'react'
import { Star, MapPin, Briefcase, Calendar, Pencil, TrendingUp, Clock, Users, Award, MessageSquare, Copy, Check, Sparkles } from 'lucide-react'
import MentorHeader from '../components/MentorHeader'
import MentorSidebar from '../components/MentorSidebar'

// ---- mock data, swap with your API/query hook ----
const mentor = {
  name: 'Ava Chen',
  initials: 'AC',
  title: 'Senior React engineer @ Vercel',
  rating: 5.0,
  reviewCount: 4,
  location: 'Remote',
  primarySkill: 'React',
  status: 'Approved' as const,
  hourlyRate: 80,
  stats: {
    sessionsDone: 0,
    totalHours: 0.0,
    students: 1,
    reviews: 4,
  },
  about: '8 years shipping production React apps. Loves teaching hooks, rendering, and Suspense.',
  expertise: ['React', 'TypeScript', 'Node.js'],
  interests: ['Frontend'],
  languages: ['English'],
  ratingBreakdown: [
    { stars: 5, count: 4 },
    { stars: 4, count: 0 },
    { stars: 3, count: 0 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ],
  reviews: [
    { name: 'John Doe', rating: 5, comment: 'cbcbcbcbc' },
    { name: 'John Doe', rating: 5, comment: 'cvcv' },
  ],
  publicLink: 'codepath.dev/mentors/m-ava',
}

function MentorProfile() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [boostModalOpen, setBoostModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const maxRatingCount = Math.max(...mentor.ratingBreakdown.map((r) => r.count), 1)

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://${mentor.publicLink}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <MentorSidebar mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <MentorHeader onMenuClick={() => setMobileNavOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-background p-3 md:p-5">
          <div className="mx-auto max-w-7xl">
            {/* Hero card */}
            <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/60 shadow-lg backdrop-blur-xl">
              <div className="gradient-violet h-28 w-full md:h-36" />
              <div className="px-5 pb-5 md:px-8 md:pb-6">
                <div className="-mt-10 flex flex-wrap items-end justify-between gap-4 md:-mt-12">
                  <div className="flex items-end gap-4">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-card/50 bg-violet/80 text-xl font-semibold text-violet-foreground shadow-lg backdrop-blur-md md:h-24 md:w-24">
                      {mentor.initials}
                    </div>
                    <div className="pb-1">
                      <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">{mentor.name}</h2>
                      <p className="text-sm text-muted-foreground">{mentor.title}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1 font-medium text-foreground">
                          <Star className="h-3.5 w-3.5 fill-amber text-amber" />
                          {mentor.rating.toFixed(1)} ({mentor.reviewCount})
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {mentor.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-3.5 w-3.5" />
                          {mentor.primarySkill}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-semibold text-success">
                          {mentor.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="rounded-lg border border-border/50 bg-background/40 px-3 py-2 text-right backdrop-blur-md">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Hourly</div>
                      <div className="font-display text-xl font-semibold text-foreground">${mentor.hourlyRate}</div>
                    </div>
                    <button className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-4 py-2 text-sm font-medium text-foreground backdrop-blur-md transition-colors hover:bg-secondary/60">
                      <Calendar className="h-4 w-4" />
                      Availability
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
                      <Pencil className="h-4 w-4" />
                      Edit profile
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium tracking-wide text-muted-foreground">SESSIONS DONE</span>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="mt-3 text-3xl font-semibold font-display text-foreground">{mentor.stats.sessionsDone}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium tracking-wide text-muted-foreground">TOTAL HOURS</span>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="mt-3 text-3xl font-semibold font-display text-foreground">{mentor.stats.totalHours.toFixed(1)}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium tracking-wide text-muted-foreground">STUDENTS</span>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="mt-3 text-3xl font-semibold font-display text-foreground">{mentor.stats.students}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium tracking-wide text-muted-foreground">REVIEWS</span>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="mt-3 text-3xl font-semibold font-display text-foreground">{mentor.stats.reviews}</p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
              {/* Left column */}
              <div className="space-y-5 lg:col-span-2">
                {/* About */}
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground">About</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{mentor.about}</p>

                  <div className="mt-6 grid grid-cols-1 gap-6 border-t border-border pt-6 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-medium tracking-wide text-muted-foreground">EXPERTISE</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {mentor.expertise.map((e) => (
                          <span key={e} className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                            {e}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium tracking-wide text-muted-foreground">INTERESTS</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {mentor.interests.map((e) => (
                          <span key={e} className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                            {e}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-border pt-6">
                    <p className="text-xs font-medium tracking-wide text-muted-foreground">LANGUAGES</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {mentor.languages.map((l) => (
                        <span key={l} className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Rating breakdown */}
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-semibold text-foreground">Rating breakdown</h3>
                    <span className="flex items-center gap-1 text-sm font-medium text-foreground">
                      <Star className="h-4 w-4 fill-amber text-amber" />
                      {mentor.rating.toFixed(1)} / 5
                    </span>
                  </div>
                  <div className="mt-5 space-y-2">
                    {mentor.ratingBreakdown.map((row) => (
                      <div key={row.stars} className="flex items-center gap-3">
                        <span className="w-3 shrink-0 text-xs text-muted-foreground">{row.stars}</span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-success"
                            style={{ width: `${(row.count / maxRatingCount) * 100}%` }}
                          />
                        </div>
                        <span className="w-6 shrink-0 text-right text-xs text-muted-foreground">{row.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent reviews */}
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-semibold text-foreground">Recent reviews</h3>
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                      {mentor.reviews.length}
                    </span>
                  </div>
                  <div className="mt-4 divide-y divide-border">
                    {mentor.reviews.map((r, i) => (
                      <div key={i} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                        <div>
                          <p className="font-medium text-foreground">{r.name}</p>
                          <p className="text-sm text-muted-foreground">{r.comment}</p>
                        </div>
                        <div className="flex items-center gap-0.5 shrink-0">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star
                              key={idx}
                              className={`h-4 w-4 ${idx < r.rating ? 'fill-amber text-amber' : 'text-muted-foreground/30'}`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-5">
                {/* Quick actions */}
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground">Quick actions</h3>
                  <div className="mt-4 space-y-2">
                    <button className="flex w-full items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
                      <Calendar className="h-4 w-4" />
                      Update availability
                    </button>
                    <button className="flex w-full items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
                      <Clock className="h-4 w-4" />
                      Review requests
                    </button>
                    <button className="flex w-full items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
                      <MessageSquare className="h-4 w-4" />
                      Message students
                    </button>
                  </div>
                </div>

                {/* Public link */}
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground">Public link</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Share this to get booked by learners.</p>
                  <div className="mt-4 flex items-center gap-2 rounded-xl border border-input bg-background px-3 py-2.5">
                    <span className="truncate text-sm text-foreground">{mentor.publicLink}</span>
                    <button onClick={handleCopy} className="ml-auto shrink-0 text-muted-foreground hover:text-foreground">
                      {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  <button className="mt-3 w-full rounded-xl bg-success px-4 py-2.5 text-sm font-semibold text-success-foreground hover:opacity-90 transition-opacity">
                    Preview public profile
                  </button>
                </div>

                {/* Boost profile */}
                <div className="rounded-2xl border border-border landing-band-soft p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Sparkles className="h-4 w-4 text-amber" />
                    Boost your profile
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Mentors with open weekly slots get up to 3x more bookings.
                  </p>
                  <button
                    onClick={() => setBoostModalOpen(true)}
                    className="mt-3 rounded-full bg-success px-4 py-2 text-sm font-semibold text-success-foreground hover:opacity-90 transition-opacity"
                  >
                    Add availability
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default MentorProfile