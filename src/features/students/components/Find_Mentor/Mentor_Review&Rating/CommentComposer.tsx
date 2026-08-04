import React, { useState } from 'react'
import { Bold, Italic, Underline, Paperclip, Image, Smile, AtSign, Star } from 'lucide-react'

interface CommentComposerProps {
  placeholder?: string
  showRating?: boolean
  onSubmit: (data: { comment: string; rating?: number }) => void
}

const toolbarButtons = [
  { icon: Bold, label: 'Bold' },
  { icon: Italic, label: 'Italic' },
  { icon: Underline, label: 'Underline' },
]

const attachButtons = [
  { icon: Paperclip, label: 'Attach file' },
  { icon: Image, label: 'Add image' },
  { icon: Smile, label: 'Add emoji' },
  { icon: AtSign, label: 'Mention someone' },
]

export function CommentComposer({ placeholder = 'Add comment...', showRating = false, onSubmit }: CommentComposerProps) {
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)

  const handleSubmit = () => {
    if (!comment.trim()) return
    onSubmit({ comment, rating: showRating ? rating : undefined })
    setComment('')
  }

  return (
    <div className="rounded-xl bg-secondary/60 p-4">
      {showRating && (
        <div className="mb-3 flex items-center gap-1" onMouseLeave={() => setHoverRating(0)}>
          {Array.from({ length: 5 }).map((_, i) => {
            const starValue = i + 1
            const active = starValue <= (hoverRating || rating)
            return (
              <button
                key={i}
                type="button"
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHoverRating(starValue)}
                className="p-0.5"
                aria-label={`Rate ${starValue} star${starValue > 1 ? 's' : ''}`}
              >
                <Star className={`h-5 w-5 ${active ? 'fill-amber text-amber' : 'text-muted-foreground/30'}`} />
              </button>
            )
          })}
        </div>
      )}

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder={placeholder}
        rows={2}
        className="w-full resize-none border-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
      />

      <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
        <div className="flex items-center gap-1">
          {toolbarButtons.map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
          <div className="mx-1 h-4 w-px bg-border" />
          {attachButtons.map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!comment.trim()}
          className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          Submit
        </button>
      </div>
    </div>
  )
}