// JAMB UTME question bank. Each subject follows the official UTME syllabus topics and lives in
// its own file under ./bank. To add questions, append to the relevant subject array — ids must
// stay unique and stable because attempts are graded on the server by id.

import { biology } from './bank/biology'
import { chemistry } from './bank/chemistry'
import { economics } from './bank/economics'
import { english } from './bank/english'
import { government } from './bank/government'
import { literature } from './bank/literature'
import { mathematics } from './bank/mathematics'
import { physics } from './bank/physics'

export type SubjectId =
  | 'english'
  | 'mathematics'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'economics'
  | 'government'
  | 'literature'

export interface Question {
  id: string
  subject: SubjectId
  topic: string
  question: string
  options: [string, string, string, string]
  answer: 0 | 1 | 2 | 3
  explanation: string
}

export interface Subject {
  id: SubjectId
  name: string
  short: string
  compulsory?: boolean
  color: string
}

export const SUBJECTS: Subject[] = [
  { id: 'english', name: 'Use of English', short: 'ENG', compulsory: true, color: '#0f766e' },
  { id: 'mathematics', name: 'Mathematics', short: 'MTH', color: '#1d4ed8' },
  { id: 'physics', name: 'Physics', short: 'PHY', color: '#7c3aed' },
  { id: 'chemistry', name: 'Chemistry', short: 'CHM', color: '#c2410c' },
  { id: 'biology', name: 'Biology', short: 'BIO', color: '#15803d' },
  { id: 'economics', name: 'Economics', short: 'ECO', color: '#b45309' },
  { id: 'government', name: 'Government', short: 'GOV', color: '#be123c' },
  { id: 'literature', name: 'Literature in English', short: 'LIT', color: '#4338ca' },
]

export const QUESTIONS: Question[] = [
  ...english,
  ...mathematics,
  ...physics,
  ...chemistry,
  ...biology,
  ...economics,
  ...government,
  ...literature,
]

export const QUESTIONS_BY_ID = new Map(QUESTIONS.map((q) => [q.id, q]))

export function getSubject(id: string) {
  return SUBJECTS.find((s) => s.id === id)
}

export function questionsFor(subject: SubjectId) {
  return QUESTIONS.filter((q) => q.subject === subject)
}

// Every CBT session draws a fresh random set of questions from each subject's bank.
export const QUESTIONS_PER_SUBJECT = 50

export const EXAM_MODES = {
  full: { label: 'Full mock (UTME)', minutes: 120, perSubject: QUESTIONS_PER_SUBJECT, description: `${QUESTIONS_PER_SUBJECT} random questions per subject · 2 hours, like the real UTME` },
} as const

export type ExamMode = keyof typeof EXAM_MODES

// Labels for modes that older attempts in history were saved with.
const RETIRED_MODE_LABELS: Record<string, string> = { quick: 'Quick drill', standard: 'Standard practice' }

export function modeLabel(mode: string) {
  return EXAM_MODES[mode as ExamMode]?.label ?? RETIRED_MODE_LABELS[mode] ?? mode
}
