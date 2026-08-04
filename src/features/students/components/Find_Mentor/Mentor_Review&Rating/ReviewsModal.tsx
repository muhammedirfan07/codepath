import React, { useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { StarRating } from './StarRating'
import { ReviewCard, type Review } from './ReviewCard'

interface ReviewsModalProps {
  open: boolean
  onClose: () => void
  rating: number
  reviewCount: number
  reviews: Review[]
}

export function ReviewsModal({ open, onClose, rating, reviewCount, reviews }: ReviewsModalProps) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const distribution = useMemo(() => {
    const counts = [0, 0, 0, 0, 0] // index 0 = 5 stars ... index 4 = 1 star
    reviews.forEach((r) => {
      const bucket = Math.min(5, Math.max(1, Math.round(r.rating)))
      counts[5 - bucket] += 1
    })
    const max = Math.max(1, ...counts)
    return counts.map((count, i) => ({ stars: 5 - i, count, pct: (count / max) * 100 }))
  }, [reviews])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="All reviews"
    >
      <div
        className="flex max-h-[85vh] w-full flex-col overflow-hidden rounded-t-2xl bg-card shadow-xl sm:max-w-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-base font-semibold text-foreground">Reviews</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b border-border px-5 py-5">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground">{rating.toFixed(1)}</div>
              <div className="mt-1 flex justify-center">
                <StarRating value={rating} />
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{reviewCount} reviews</div>
            </div>

            <div className="flex-1 space-y-1.5">
              {distribution.map(({ stars, pct }) => (
                <div key={stars} className="flex items-center gap-2">
                  <span className="w-3 text-xs text-muted-foreground">{stars}</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-amber" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
          {reviews.length === 0 && <p className="text-sm text-muted-foreground">No reviews yet.</p>}
        </div>
      </div>
    </div>,
    document.body
  )
}