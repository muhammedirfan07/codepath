import React, { useState } from 'react'
import { Pencil, X, Camera } from 'lucide-react'

const EXPERTISE_OPTIONS = [
  'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'SQL', 'MongoDB', 'Docker',
  'AWS', 'Next.js', 'Go', 'Rust', 'Kubernetes', 'GraphQL',
]

const INTEREST_OPTIONS = [
  'Frontend', 'Backend', 'Full-stack', 'DevOps', 'Databases', 'Data', 'ML', 'Cloud',
  'Mobile', 'Design systems', 'APIs', 'Performance',
]

const LANGUAGE_OPTIONS = [
  'English', 'Spanish', 'Mandarin', 'Hindi', 'Arabic', 'French', 'German', 'Portuguese', 'Japanese',
]

function toggleValue(list: string[], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

function UpdateProfileModal() {
  const [open, setOpen] = useState(false)

  const [fullName, setFullName] = useState('Ava Chen')
  const [hourlyRate, setHourlyRate] = useState('80')
  const [headline, setHeadline] = useState('Senior React engineer @ Vercel')
  const [about, setAbout] = useState(
    '8 years shipping production React apps. Loves teaching hooks, rendering, and Suspense.'
  )
  const [expertise, setExpertise] = useState<string[]>(['React', 'TypeScript', 'Node.js'])
  const [interests, setInterests] = useState<string[]>(['Frontend'])
  const [languages, setLanguages] = useState<string[]>(['English'])

  const initials = fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const handleSave = () => {
    // TODO: wire up to your update mutation
    setOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 rounded-md px-3 text-xs transition-opacity hover:opacity-90"
      >
        <Pencil className="h-4 w-4" />
        Edit profile
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <div className="relative  z-[100] flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:max-w-xl md:max-w-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-8">
              <h2 className="font-display text-lg font-semibold text-foreground sm:text-xl">
                Edit mentor profile
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-8">
              {/* Avatar */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-violet text-2xl font-semibold text-violet-foreground sm:h-28 sm:w-28">
                    {initials}
                  </div>
                  <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md hover:opacity-90 transition-opacity">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <button className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
                  Add photo
                </button>
                <p className="text-xs text-muted-foreground">JPG, PNG, or WebP · maximum 2 MB</p>
              </div>

              {/* Full name / Hourly rate */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-foreground">Full name</label>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Hourly rate (USD)</label>
                  <input
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    inputMode="numeric"
                    className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              </div>

              {/* Headline */}
              <div className="mt-5">
                <label className="text-sm font-medium text-foreground">Headline</label>
                <input
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              {/* About */}
              <div className="mt-5">
                <label className="text-sm font-medium text-foreground">About</label>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  rows={4}
                  className="mt-1.5 w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              {/* Expertise */}
              <div className="mt-6">
                <p className="text-sm font-medium text-foreground">Expertise</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {EXPERTISE_OPTIONS.map((opt) => {
                    const active = expertise.includes(opt)
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setExpertise((prev) => toggleValue(prev, opt))}
                        className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                          active
                            ? 'border-transparent bg-primary text-primary-foreground'
                            : 'border-border bg-background text-foreground hover:bg-secondary'
                        }`}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Technical interests */}
              <div className="mt-6">
                <p className="text-sm font-medium text-foreground">Technical interests</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {INTEREST_OPTIONS.map((opt) => {
                    const active = interests.includes(opt)
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setInterests((prev) => toggleValue(prev, opt))}
                        className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                          active
                            ? 'border-transparent bg-primary text-primary-foreground'
                            : 'border-border bg-background text-foreground hover:bg-secondary'
                        }`}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Languages */}
              <div className="mt-6">
                <p className="text-sm font-medium text-foreground">Languages</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {LANGUAGE_OPTIONS.map((opt) => {
                    const active = languages.includes(opt)
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setLanguages((prev) => toggleValue(prev, opt))}
                        className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                          active
                            ? 'border-transparent bg-primary text-primary-foreground'
                            : 'border-border bg-background text-foreground hover:bg-secondary'
                        }`}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-border px-5 py-4 sm:px-8">
              <button
                onClick={() => setOpen(false)}
                className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UpdateProfileModal