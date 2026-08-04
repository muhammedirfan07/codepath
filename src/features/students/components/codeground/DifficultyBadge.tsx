import type { Difficulty } from './codegroundd'

const styles: Record<Difficulty, string> = {
  Easy: 'bg-emerald-50 text-emerald-600',
  Medium: 'bg-amber-50 text-amber-600',
  Hard: 'bg-rose-50 text-rose-600',
}

export default function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[difficulty]}`}>
      {difficulty}
    </span>
  )
}