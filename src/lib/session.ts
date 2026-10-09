import { EXAM_MODES, questionsFor, type ExamMode, type SubjectId } from '@/data/questions'
import type { AttemptRow } from './device'

// The in-progress exam lives in sessionStorage so a refresh doesn't lose answers.
const SESSION_KEY = 'jambpass:session'
const RESULT_KEY = 'jambpass:result'

export interface ExamSession {
  mode: ExamMode
  nickname: string
  subjects: SubjectId[]
  questionIds: string[]
  answers: Record<string, number>
  startedAt: number
  durationSeconds: number
}

export interface ExamResult {
  attempt: AttemptRow
  questionIds: string[]
  answers: Record<string, number>
  saved: boolean
}

function shuffle<T>(arr: T[]) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function createSession(subjects: SubjectId[], mode: ExamMode, nickname: string): ExamSession {
  const { perSubject, minutes } = EXAM_MODES[mode]
  const questionIds = subjects.flatMap((s) => shuffle(questionsFor(s)).slice(0, perSubject).map((q) => q.id))
  const session: ExamSession = {
    mode,
    nickname,
    subjects,
    questionIds,
    answers: {},
    startedAt: Date.now(),
    durationSeconds: minutes * 60,
  }
  saveSession(session)
  return session
}

const read = <T,>(key: string): T | null => {
  try {
    const raw = sessionStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

export const loadSession = () => read<ExamSession>(SESSION_KEY)
export const saveSession = (s: ExamSession) => sessionStorage.setItem(SESSION_KEY, JSON.stringify(s))
export const clearSession = () => sessionStorage.removeItem(SESSION_KEY)
export const loadResult = () => read<ExamResult>(RESULT_KEY)
export const saveResult = (r: ExamResult) => sessionStorage.setItem(RESULT_KEY, JSON.stringify(r))
