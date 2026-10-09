import { EXAM_MODES, QUESTIONS_BY_ID, getSubject, type ExamMode } from '@/data/questions'
import type { SubjectBreakdown } from '../../db/schema'

// JAMB scores each subject out of 100, for a total of 400.
export function gradeAttempt(questionIds: string[], answers: Record<string, number>) {
  const breakdown: SubjectBreakdown = {}
  let correct = 0
  for (const id of questionIds) {
    const q = QUESTIONS_BY_ID.get(id)
    if (!q) continue
    const row = (breakdown[q.subject] ??= { correct: 0, total: 0, score: 0 })
    row.total++
    if (answers[id] === q.answer) {
      row.correct++
      correct++
    }
  }
  for (const row of Object.values(breakdown)) row.score = Math.round((row.correct / row.total) * 100)
  const subjects = Object.keys(breakdown)
  const score = Object.values(breakdown).reduce((sum, r) => sum + r.score, 0)
  return { breakdown, correct, total: Object.values(breakdown).reduce((s, r) => s + r.total, 0), score, maxScore: subjects.length * 100, subjects }
}

export function isValidMode(mode: unknown): mode is ExamMode {
  return typeof mode === 'string' && mode in EXAM_MODES
}

export function isValidSubjectList(subjects: unknown): subjects is string[] {
  return Array.isArray(subjects) && subjects.length > 0 && subjects.length <= 4 && subjects.every((s) => typeof s === 'string' && getSubject(s))
}
