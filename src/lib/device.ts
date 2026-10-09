// Anonymous per-browser identity so students can see their score history without signing up.
const KEY = 'jambpass:device'
const NAME_KEY = 'jambpass:nickname'

export function getDeviceId() {
  let id = localStorage.getItem(KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(KEY, id)
  }
  return id
}

export const getNickname = () => localStorage.getItem(NAME_KEY) ?? ''
export const setNickname = (name: string) => localStorage.setItem(NAME_KEY, name)

export interface AttemptRow {
  id: number
  nickname: string
  mode: string
  subjects: string[]
  correct: number
  totalQuestions: number
  score: number
  maxScore: number
  durationSeconds: number
  breakdown: Record<string, { correct: number; total: number; score: number }>
  createdAt: string
}

export function formatTime(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  return h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`
}
