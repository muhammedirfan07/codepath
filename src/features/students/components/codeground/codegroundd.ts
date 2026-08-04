export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export interface Problem {
  id: number
  title: string
  tags: string[]
  difficulty: Difficulty
  accuracy: number
  description: string
  examples: { input: string; output: string; note?: string }[]
  constraints: string[]
  starterCode: string
  functionName: string
}

export interface TestCase {
  input: string
  expected: string
  actual?: string
  passed?: boolean
  timeMs?: number
}

export interface Submission {
  id: string
  timestamp: string
  status: 'Success' | 'Wrong answer' | 'Error'
  passedCount: number
  totalCount: number
  durationMs: number
  code: string
  tests: TestCase[]
}