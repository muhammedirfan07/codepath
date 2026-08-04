import type { Problem } from './codegroundd'

export const problems: Problem[] = [
  {
    id: 1,
    title: 'Two Sum',
    tags: ['Array', 'Hash Table'],
    difficulty: 'Easy',
    accuracy: 51,
    functionName: 'twoSum',
    description:
      "Given an array of integers `nums` and an integer `target`, return the indices of the two numbers that add up to `target`. Assume exactly one solution exists.",
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', note: 'nums[0] + nums[1] = 9.' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
    ],
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i], target <= 10^9'],
    starterCode: `function twoSum(nums, target) {\n\n}`,
  },
  {
    id: 2,
    title: 'Valid Parentheses',
    tags: ['String', 'Stack'],
    difficulty: 'Easy',
    accuracy: 41,
    functionName: 'isValid',
    description: "Given a string `s` containing just the characters `(){}[]`, determine if the input string is valid.",
    examples: [{ input: 's = "()[]{}"', output: 'true' }],
    constraints: ['1 <= s.length <= 10^4'],
    starterCode: `function isValid(s) {\n\n}`,
  },
  // ...add the rest of your 50 problems here in the same shape
]

export const difficultyCounts = {
  All: problems.length,
  Easy: problems.filter((p) => p.difficulty === 'Easy').length,
  Medium: problems.filter((p) => p.difficulty === 'Medium').length,
  Hard: problems.filter((p) => p.difficulty === 'Hard').length,
}