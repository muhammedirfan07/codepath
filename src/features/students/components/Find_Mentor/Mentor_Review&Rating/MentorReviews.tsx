import React, { useState } from 'react'
import { PenSquare, X, Star, ChevronRight } from 'lucide-react'
import { StarRating } from './StarRating'
import { ReviewCard, type Review } from '../Mentor_Review&Rating/ReviewCard'
import { ReviewsModal } from './ReviewsModal'

interface MentorReviewsProps {
  rating: number
  reviewCount: number
  reviews: Review[]
  onSubmitReview?: (data: { rating: number; comment: string }) => void
}

function AddReviewForm({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void
  onSubmit: (data: { rating: number; comment: string }) => void
}) {
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')

  return (
    <div className="mb-4 rounded-xl border border-border bg-secondary/40 p-4">
      <h3 className="mb-2 text-sm font-semibold text-foreground">Leave a review</h3>

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
              <Star className={`h-6 w-6 ${active ? 'fill-amber text-amber' : 'text-muted-foreground/30'}`} />
            </button>
          )
        })}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience with this mentor..."
        className="mb-3 min-h-[90px] w-full resize-y rounded-lg border border-border bg-card p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
      />

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            onSubmit({ rating, comment })
            setComment('')
          }}
          disabled={!comment.trim()}
          className="rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          Post review
        </button>
      </div>
    </div>
  )
}

const PREVIEW_COUNT = 3

export function MentorReviews({ rating, reviewCount, reviews, onSubmitReview }: MentorReviewsProps) {
  const [showForm, setShowForm] = useState(false)
  const [showAll, setShowAll] = useState(false)

  const handleSubmit = (data: { rating: number; comment: string }) => {
    onSubmitReview?.(data)
    setShowForm(false)
  }

  const previewReviews = reviews.slice(0, PREVIEW_COUNT)

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow overflow-hidden p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-foreground">Reviews</h2>
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="mt-0.5 flex items-center cursor-pointer gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <StarRating value={rating} size="sm" />
            {rating.toFixed(1)} · {reviewCount} reviews
          </button>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center text-nowrap gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          {showForm ? <X className="h-4 w-4" /> : <PenSquare className="h-4 w-4" />}
          {showForm ? 'Cancel' : 'Add review'}
        </button>
      </div>

      {showForm && <AddReviewForm onCancel={() => setShowForm(false)} onSubmit={handleSubmit} />}

      <div className="space-y-3">
        {previewReviews.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
        {reviews.length === 0 && <p className="text-sm text-muted-foreground">No reviews yet.</p>}
      </div>

      {reviews.length > PREVIEW_COUNT && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg py-2 text-sm font-medium text-primary hover:bg-secondary"
        >
          See all {reviewCount} reviews
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      )}

      <ReviewsModal
        open={showAll}
        onClose={() => setShowAll(false)}
        rating={rating}
        reviewCount={reviewCount}
        reviews={reviews}
      />
    </div>
  )
}