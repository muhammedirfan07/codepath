import React from 'react'
import { Star, ArrowRight } from 'lucide-react'
import type { Mentor } from '../Find_Mentor/mentorr'
import { useNavigate } from 'react-router-dom'

interface Props {
  mentor: Mentor
  onClick: () => void
}

export default function MentorCard({ mentor, onClick }: Props) {
  const navigate = useNavigate()
  return (
  
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl border bg-card text-card-foreground shadow flex h-full flex-col overflow-hidden p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:ring-1 hover:ring-primary/30"
    >
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
          {mentor.initials}
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-display text-base  font-semibold text-foreground">{mentor.name}</h3>
          <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{mentor.title}</p>
          <div className="mt-1 flex items-center gap-1 text-sm">
            <Star className="h-3.5 w-3.5 fill-amber text-amber" />
            <span className="font-font-semibold text-foreground">{mentor.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({mentor.reviewCount})</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs">
        <span className="inline-block h-2 w-2 rounded-full bg-success" />
        <span className="font-medium text-success">  
          Available Remotely
        </span>
        <span className="ml-auto font-semibold">${mentor.hourlyRate}/hr</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {mentor.skills.map((s) => (
          <span key={s} className="inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-[10px]">
            {s}
          </span>
        ))}
      </div>
      

      <div className="mt-4 border-t border-border/70 pt-3">
        <div className="mb-2 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          Next available
        </div>
        <div className="flex gap-1.5 overflow-hidden">
          {mentor.nextAvailable.map((slot, i) => (
            <div key={i} className="flex-1 rounded-md border border-border/80 px-2 py-1.5 text-center">
              <div className="text-[10px] font-semibold text-foreground">{slot.time}</div>
              <div className="text-[9px] text-success">Available</div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={()=>navigate('/student/mentors')} className="mt-4 flex items-center justify-between text-xs font-medium text-primary">
        View profile
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  )
}