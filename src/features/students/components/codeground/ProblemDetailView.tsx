import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, History, RotateCcw, Play, Send, Trash2, X } from 'lucide-react'
import type { Problem, Submission, TestCase } from './codegroundd'
import DifficultyBadge from './DifficultyBadge'

interface Props {
  problem: Problem
  onBack: () => void
}

// Replace this with a real call to your judge/runner service.
async function runAgainstJudge(code: string, problem: Problem): Promise<TestCase[]> {
  await new Promise((r) => setTimeout(r, 400))
  return problem.examples.map((ex, i) => ({
    input: ex.input,
    expected: ex.output,
    actual: code.includes('return') ? ex.output : 'undefined',
    passed: code.includes('return'),
    timeMs: 0.1 + i * 0.05,
  }))
}

export default function ProblemDetailView({ problem, onBack }: Props) {
  const [code, setCode] = useState(problem.starterCode)
  const [running, setRunning] = useState(false)
  const [results, setResults] = useState<TestCase[] | null>(null)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [showHistory, setShowHistory] = useState(false)

  const passedCount = results?.filter((r) => r.passed).length ?? 0
  const totalCount = results?.length ?? 0

  const handleRun = async (isSubmit: boolean) => {
    setRunning(true)
    setShowHistory(false)
    const tests = await runAgainstJudge(code, problem)
    setResults(tests)
    setRunning(false)

    if (isSubmit) {
      const allPassed = tests.every((t) => t.passed)
      const submission: Submission = {
        id: crypto.randomUUID(),
        timestamp: new Date().toLocaleString(),
        status: allPassed ? 'Success' : 'Wrong answer',
        passedCount: tests.filter((t) => t.passed).length,
        totalCount: tests.length,
        durationMs: Math.max(...tests.map((t) => t.timeMs ?? 0)),
        code,
        tests,
      }
      setSubmissions((prev) => [submission, ...prev])
    }
  }

  const handleReset = () => {
    setCode(problem.starterCode)
    setResults(null)
  }

  const loadSubmission = (s: Submission) => {
    setCode(s.code)
    setResults(s.tests)
    setShowHistory(false)
  }

  return (
    <div className="flex h-full flex-col p-4 md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm">
          <button onClick={onBack} className="flex items-center gap-1 text-gray-500 hover:text-gray-900">
            <ChevronLeft className="h-4 w-4" />
            All problems
          </button>
          <ChevronRight className="h-3.5 w-3.5 text-gray-300" />
          <span className="font-semibold text-gray-900">
            {problem.id}. {problem.title}
          </span>
          <DifficultyBadge difficulty={problem.difficulty} />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHistory((v) => !v)}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            <History className="h-4 w-4" />
            History
            {submissions.length > 0 && (
              <span className="rounded-full bg-gray-100 px-1.5 text-xs">{submissions.length}</span>
            )}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
          <button
            onClick={() => handleRun(false)}
            disabled={running}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          >
            <Play className="h-4 w-4" />
            Run
          </button>
          <button
            onClick={() => handleRun(true)}
            disabled={running}
            className="flex items-center gap-1.5 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            Submit
          </button>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-4 overflow-hidden lg:grid-cols-2">
        {/* Left: problem panel */}
        <div className="overflow-y-auto rounded-xl border border-gray-100 p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Problem</h2>
            <div className="flex gap-1.5">
              {problem.tags.map((t) => (
                <span key={t} className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <p className="mb-5 text-sm leading-relaxed text-gray-700">{problem.description}</p>

          <div className="mb-5 space-y-3">
            {problem.examples.map((ex, i) => (
              <div key={i} className="rounded-lg bg-gray-50 p-3 text-sm">
                <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Example {i + 1}
                </div>
                <div className="font-mono text-xs text-gray-700">Input: {ex.input}</div>
                <div className="font-mono text-xs text-gray-700">Output: {ex.output}</div>
                {ex.note && <div className="mt-1 text-xs text-gray-500">💡 {ex.note}</div>}
              </div>
            ))}
          </div>

          <div className="mb-5">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Constraints</div>
            <ul className="list-inside list-disc space-y-0.5 text-sm text-gray-600">
              {problem.constraints.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-violet-50 px-3 py-2.5 text-xs text-violet-700">
            Runner calls <code className="font-mono">{problem.functionName}(...)</code> against 3 hidden tests.
          </div>
        </div>

        {/* Right: editor + console */}
        <div className="flex flex-col overflow-hidden rounded-xl border border-gray-800 bg-[#0d0d0d]">
          <div className="flex items-center justify-between border-b border-gray-800 px-4 py-2.5">
            <span className="text-xs text-gray-400">JavaScript</span>
            <div className="flex gap-2">
              <button onClick={handleReset} className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-gray-400 hover:bg-gray-800">
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
              <button onClick={() => handleRun(false)} className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-gray-400 hover:bg-gray-800">
                <Play className="h-3.5 w-3.5" /> Run
              </button>
              <button
                onClick={() => handleRun(true)}
                className="flex items-center gap-1 rounded-md bg-violet-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-violet-700"
              >
                <Send className="h-3.5 w-3.5" /> Submit
              </button>
            </div>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="min-h-[220px] flex-1 resize-none bg-transparent p-4 font-mono text-sm text-gray-100 outline-none"
          />

          {/* Console: run results OR submission history, toggled */}
          {(results || showHistory) && (
            <div className="max-h-64 overflow-y-auto border-t border-gray-800 bg-[#0a0a0a] p-4">
              {showHistory ? (
                <>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-300">Your submissions ({submissions.length})</span>
                    <div className="flex gap-3">
                      {submissions.length > 0 && (
                        <button
                          onClick={() => setSubmissions([])}
                          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300"
                        >
                          <Trash2 className="h-3 w-3" /> Clear
                        </button>
                      )}
                      <button onClick={() => setShowHistory(false)} className="text-gray-500 hover:text-gray-300">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  {submissions.length === 0 && (
                    <p className="text-xs text-gray-600">No submissions yet.</p>
                  )}
                  <div className="space-y-2">
                    {submissions.map((s) => (
                      <div key={s.id} className="flex items-center justify-between rounded-lg bg-gray-900 px-3 py-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-full px-2 py-0.5 font-medium ${
                              s.status === 'Success' ? 'bg-emerald-900 text-emerald-300' : 'bg-rose-900 text-rose-300'
                            }`}
                          >
                            {s.status}
                          </span>
                          <span className="text-gray-500">
                            {s.passedCount}/{s.totalCount} tests · {s.durationMs.toFixed(1)}ms
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-600">{s.timestamp}</span>
                          <button
                            onClick={() => loadSubmission(s)}
                            className="rounded-md border border-gray-700 px-2 py-1 text-gray-300 hover:bg-gray-800"
                          >
                            Load code
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-300">Console</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        passedCount === totalCount ? 'bg-emerald-900 text-emerald-300' : 'bg-rose-900 text-rose-300'
                      }`}
                    >
                      {passedCount}/{totalCount} passed
                    </span>
                  </div>
                  <div className="space-y-2">
                    {results!.map((t, i) => (
                      <div
                        key={i}
                        className={`rounded-lg p-3 text-xs ${
                          t.passed ? 'bg-emerald-950/40 text-emerald-300' : 'bg-rose-950/40 text-rose-300'
                        }`}
                      >
                        <div className="mb-1 flex items-center justify-between font-medium">
                          <span>{t.passed ? '✓' : '✗'} Test {i + 1}</span>
                          <span className="text-gray-500">{t.timeMs?.toFixed(1)}ms</span>
                        </div>
                        <div className="text-gray-400">Input: {t.input}</div>
                        <div className="text-gray-400">Expected: {t.expected}</div>
                        {!t.passed && <div className="text-gray-400">Actual: {t.actual}</div>}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}