import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Sparkles } from 'lucide-react'
import { problems as allProblems, difficultyCounts } from './mockproblem'
import type { Difficulty } from './codegroundd'
import DifficultyBadge from './DifficultyBadge'

type Filter = 'All' | Difficulty

export default function ProblemListView() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<Filter>('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return allProblems.filter((p) => {
      const matchesFilter = filter === 'All' || p.difficulty === filter
      const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase())
      return matchesFilter && matchesQuery
    })
  }, [filter, query])

  const filters: Filter[] = ['All', 'Easy', 'Medium', 'Hard']

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Codeground</h1>
          <p className="mt-1 text-sm text-gray-500">
            {allProblems.length} LeetCode-style problems. Filter, search, or start a 10-problem sprint round.
          </p>
        </div>
        <button className="flex shrink-0 items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-700">
          <Sparkles className="h-4 w-4" />
          Start 10-problem round
        </button>
      </div>

      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === f ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f}
              <span className={filter === f ? 'text-white/80' : 'text-gray-400'}>{difficultyCounts[f]}</span>
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search problems"
            className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
              <th className="w-12 px-4 py-3">#</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Tags</th>
              <th className="px-4 py-3">Difficulty</th>
              <th className="px-4 py-3 text-right">Acc.</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr
                key={p.id}
                onClick={() => navigate(`/student/codeground/${p.id}`)}
                className="cursor-pointer border-b border-gray-50 last:border-0 hover:bg-gray-50"
              >
                <td className="px-4 py-4 text-gray-400">{p.id}</td>
                <td className="px-4 py-4 font-medium text-gray-900">{p.title}</td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <DifficultyBadge difficulty={p.difficulty} />
                </td>
                <td className="px-4 py-4 text-right text-gray-500">{p.accuracy}%</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-gray-400">
                  No problems match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}