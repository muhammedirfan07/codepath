import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Globe, Clock, BadgeCheck } from 'lucide-react'
import type { Mentor } from './mentorr'
import { mockReviews } from './mockMentors'
import BookingCalendar from './BookingCalendar'
import { ScoreBar } from './Mentor_Review&Rating/StarRating'
import { MentorReviews } from '../Find_Mentor/Mentor_Review&Rating/MentorReviews'

interface Props {
  mentor: Mentor
}

export default function MentorDetailView({ mentor }: Props) {
  const navigate = useNavigate()
  const reviews = mockReviews[mentor.id] ?? []

  return (
    <div className="p-4 md:p-6">
      <button
        onClick={() => navigate('/student/mentors')}
        className="mb-4 flex items-center gap-1.5 text-sm cursor-pointer text-muted-foreground hover:text-violet"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to mentors
      </button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <div className="rounded-xl border bg-card text-card-foreground shadow overflow-hidden p-6">
            <div className="grid gap-6 sm:grid-cols-[220px_minmax(0,1fr)]">
              <div className="relative aspect-[4/5] w-full  rounded-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-warning/10">
               <span className='flex items-center justify-center h-full w-full rounded-2xl bg-transparent font-display text-6xl text-primary'> {mentor.initials}</span>
                <BadgeCheck className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-card text-primary" />
              </div>

              <div className="min-w-0 space-y-4">
                <h1 className="font-display text-3xl font-bold tracking-tight">{mentor.name}</h1>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {mentor.skills.join(', ')}
                </p>

                <div className="rounded-2xl bg-accent/20 p-4">
                  <div className='flex items-start gap-4'>
                    <div className="shrink-0">
                      <div className="font-display text-4xl font-bold">{mentor.rating.toFixed(1)}</div>
                      <div className="text-xs text-muted-foreground">{mentor.reviewCount} reviews</div>
                    </div>
                    <div className='min-w-0 flex-1'>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        AI summary
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-foreground/80">{mentor.aiSummary}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <ScoreBar label="Response time" value={mentor.scores.responseTime} />
                  <ScoreBar label="Session style" value={mentor.scores.sessionStyle} />
                  <ScoreBar label="Clarity" value={mentor.scores.clarity} />
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 border-t border-border/70 pt-6 sm:grid-cols-[220px_minmax(0,1fr)]">
              <div className='space-y-2 text-sm text-muted-foreground'>
                <div className="mb-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" /> {mentor.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Globe className="h-4 w-4" /> {mentor.language}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" /> {mentor.responseTime}
                  </span>
                </div>
                <div className="tmt-3 font-display text-lg font-bold text-foreground">
                ${mentor.hourlyRate}
                <span className="text-sm font-normal text-muted-foreground">/hr</span>
              </div>
              </div>
             <div>
                <p className="text-sm leading-relaxed">{mentor.bio}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {mentor.skills.map((s) => (
                    <span key={s} className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                      {s}
                    </span>
                  ))}
                </div>
             </div>
              
            </div>
          </div>

          <MentorReviews
            rating={mentor.rating}
            reviewCount={mentor.reviewCount}
            reviews={reviews}
            onSubmitReview={(data) => {
              console.log('New review for', mentor.id, data)
            }}
          />
        </div>

        <div>
          <BookingCalendar mentor={mentor} />
        </div>
      </div>
    </div>
  )
}