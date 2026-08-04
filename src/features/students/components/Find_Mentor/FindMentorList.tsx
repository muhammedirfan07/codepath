import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Sparkles } from 'lucide-react'
import  { mentors, skillFilters } from '../Find_Mentor/mockMentors'
import MentorCard from './MentorCard'

export default function FindMentorList() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return mentors.filter((m) => {
      const matchesFilter = filter === 'All' || m.skills.includes(filter)
      const q = query.toLowerCase()
      const matchesQuery =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.title.toLowerCase().includes(q) ||
        m.skills.some((s) => s.toLowerCase().includes(q))
      return matchesFilter && matchesQuery
    })
  }, [filter, query])

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Find a mentor</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse vetted experts. Tap a card to view the profile and book a session.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
            <Sparkles className="h-4 w-4" />
            AI mentor matcher
          </button>
         
        </div>
      </div>

      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search mentors, skills, headlines..."
          className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {skillFilters.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-2.5 py-0.5 cursor-pointer text-xs font-medium transition-colors ${
              filter === s
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-accent'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((m) => (
          <MentorCard key={m.id} mentor={m} onClick={() => navigate(`/student/mentors/${m.id}`)} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-10 text-center text-muted-foreground">
            No mentors match your search.
          </div>
        )}
      </div>
    </div>
  )
}