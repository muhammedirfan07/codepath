export interface Mentor {
  id: number
  name: string
  initials: string
  title: string
  rating: number
  reviewCount: number
  hourlyRate: number
  available: boolean
  skills: string[]
  nextAvailable: { time: string; available: boolean }[]
  location: string
  language: string
  responseTime: string
  bio: string
  aiSummary: string
  scores: {
    responseTime: number
    sessionStyle: number
    clarity: number
  }
}

export interface Review {
  id: string
  name: string
  initials: string
  date: string
  rating: number
  comment: string
}

export interface TimeSlot {
  time: string
  period: 'Morning' | 'Afternoon' | 'Evening'
}