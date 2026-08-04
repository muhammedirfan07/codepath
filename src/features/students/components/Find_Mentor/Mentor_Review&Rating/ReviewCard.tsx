import React, { useEffect, useRef, useState } from 'react'
import { ThumbsUp, ThumbsDown, MessageSquare, MoreHorizontal, BadgeCheck, Pencil, Trash2, Flag } from 'lucide-react'

export interface ReviewReply {
  authorName: string
  authorInitials: string
  verified?: boolean
  date: string
  comment: string
}

export interface Review {
  id: string
  initials: string
  name: string
  date: string
  rating: number
  comment: string
  upvotes?: number
  downvotes?: number
  reply?: ReviewReply
}

const AVATAR_GRADIENTS = [
  'from-violet-400 to-fuchsia-400',
  'from-amber-400 to-orange-400',
  'from-emerald-400 to-teal-400',
  'from-sky-400 to-blue-400',
  'from-rose-400 to-pink-400',
]

function gradientFor(seed: string) {
  const idx = seed.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % AVATAR_GRADIENTS.length
  return AVATAR_GRADIENTS[idx]
}

function OptionsMenu({
  onEdit,
  onDelete,
  onReport,
}: {
  onEdit?: () => void
  onDelete?: () => void
  onReport?: () => void
}) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  const choose = (fn?: () => void) => {
    fn?.()
    setOpen(false)
  }

  return (
    <div className="relative ml-auto" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
        aria-label="More options"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-7 z-20 w-36 overflow-hidden rounded-lg border border-border bg-card py-1 shadow-lg"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => choose(onEdit)}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-foreground hover:bg-secondary"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </button>
          
          <button
            type="button"
            role="menuitem"
            onClick={() => choose(onDelete)}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-destructive hover:bg-secondary"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

function VoteRow({
  upvotes = 0,
  downvotes = 0,
  onReply,
  onEdit,
  onDelete,
  onReport,
}: {
  upvotes?: number
  downvotes?: number
  onReply?: () => void
  onEdit?: () => void
  onDelete?: () => void
  onReport?: () => void
}) {
  const [vote, setVote] = useState<'up' | 'down' | null>(null)
  const [up, setUp] = useState(upvotes)
  const [down, setDown] = useState(downvotes)

  const castVote = (next: 'up' | 'down') => {
    if (vote === next) {
      setVote(null)
      next === 'up' ? setUp((v) => v - 1) : setDown((v) => v - 1)
      return
    }
    if (vote === 'up') setUp((v) => v - 1)
    if (vote === 'down') setDown((v) => v - 1)
    setVote(next)
    next === 'up' ? setUp((v) => v + 1) : setDown((v) => v + 1)
  }

  return (
    <div className="mt-2.5 flex items-center gap-4 text-sm">
      <button
        type="button"
        onClick={() => castVote('up')}
        className={`flex items-center gap-1.5 font-medium transition-colors ${
          vote === 'up' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <ThumbsUp className={`h-4 w-4 ${vote === 'up' ? 'fill-primary' : ''}`} />
        {up}
      </button>
      <button
        type="button"
        onClick={() => castVote('down')}
        className={`flex items-center gap-1.5 font-medium transition-colors ${
          vote === 'down' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <ThumbsDown className={`h-4 w-4 ${vote === 'down' ? 'fill-foreground' : ''}`} />
        {down}
      </button>
      {onReply && (
        <button
          type="button"
          onClick={onReply}
          className="flex items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground"
        >
          <MessageSquare className="h-4 w-4" />
          Reply
        </button>
      )}

      <OptionsMenu onEdit={onEdit} onDelete={onDelete} onReport={onReport} />
    </div>
  )
}

export function ReviewCard({
  review,
  onReply,
  onEdit,
  onDelete,
  onReport,
}: {
  review: Review
  onReply?: (reviewId: string) => void
  onEdit?: (reviewId: string) => void
  onDelete?: (reviewId: string) => void
  onReport?: (reviewId: string) => void
}) {
  return (
    <div className="relative">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-semibold text-white ${gradientFor(
            review.name
          )}`}
        >
          {review.initials}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-sm font-semibold text-foreground">{review.name}</span>
            <span className="text-xs text-muted-foreground">{review.date}</span>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-foreground">{review.comment}</p>

          <VoteRow
            upvotes={review.upvotes}
            downvotes={review.downvotes}
            onReply={onReply ? () => onReply(review.id) : undefined}
            onEdit={onEdit ? () => onEdit(review.id) : undefined}
            onDelete={onDelete ? () => onDelete(review.id) : undefined}
            onReport={onReport ? () => onReport(review.id) : undefined}
          />
        </div>
      </div>

      {review.reply && (
        <div className="relative mt-3 pl-[52px]">
          <div className="absolute left-5 top-[-12px] h-[calc(100%-8px)] w-px rounded-full bg-border" aria-hidden />
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white">
              <span className="text-xs font-bold">{review.reply.authorInitials}</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-1.5">
                <span className="text-sm font-semibold text-foreground">{review.reply.authorName}</span>
                {review.reply.verified && <BadgeCheck className="h-3.5 w-3.5 fill-primary text-white" />}
                <span className="text-xs text-muted-foreground">{review.reply.date}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-foreground">{review.reply.comment}</p>
              <VoteRow upvotes={0} downvotes={0} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}