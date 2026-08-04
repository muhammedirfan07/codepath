import React from 'react'
import { Star } from 'lucide-react'

interface StarRatingProps {
  value: number
  size?: 'sm' | 'md'
  showValue?: boolean
}

export function StarRating({ value, size = 'sm', showValue = false }: StarRatingProps) {
  const starSize = size === 'sm' ? 'h-2.5 w-2.5' : 'h-4 w-4'

  return (
    <div className="mt-1 flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${starSize} ${i < Math.round(value) ? 'fill-amber text-amber' : 'text-muted-foreground/30'}`}
        />
      ))}
      {showValue && <span className="text-xs ms-1 font-semibold">{value.toFixed(2)}</span>}
    </div>
  )
}

interface ScoreBarProps {
  label: string
  value: number
}

export function ScoreBar({ label, value }: ScoreBarProps) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <StarRating value={value} showValue />
    </div>
  )
}