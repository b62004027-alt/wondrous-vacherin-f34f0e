import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight, Clock3, Flag, Send } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Logo } from '@/components/SiteHeader'
import { QUESTIONS_BY_ID, getSubject, modeLabel, type Question } from '@/data/questions'
import { formatTime, getDeviceId, type AttemptRow } from '@/lib/device'
import { gradeAttempt } from '@/lib/grading'
import { clearSession, loadSession, saveResult, saveSession, type ExamSession } from '@/lib/session'

export const Route = createFileRoute('/exam')({
  head: () => ({ meta: [{ title: 'CBT in progress — JambPass' }] }),
  component: Exam,
})

const LETTERS = ['A', 'B', 'C', 'D'] as const

function Exam() {
  const [session, setSession] = useState<ExamSession | null | undefined>(undefined)
  useEffect(() => setSession(loadSession()), [])

  if (session === undefined) return <div className="grid min-h-screen place-items-center text-ink/50">Loading exam…</div>
  if (session === null)
    return (
      <div className="grid min-h-screen place-items-center px-5 text-center">
        <div>
          <h1 className="font-display text-3xl font-bold">No exam in progress</h1>
          <p className="mt-2 text-ink/60">Set up a session to start practising.</p>
          <Link to="/practice" className="mt-6 inline-block rounded-xl bg-forest px-6 py-3 font-semibold text-cream">Set up CBT</Link>
        </div>
      </div>
    )
  return <ExamRunner initial={session} />
}

function ExamRunner({ initial }: { initial: ExamSession }) {
  const navigate = useNavigate()
  const [session, setSession] = useState(initial)
  const [subjectIdx, setSubjectIdx] = useState(0)
  const [qIdx, setQIdx] = useState(0)
  const [confirming, setConfirming] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [now, setNow] = useState(Date.now())
  const submittedRef = useRef(false)

  const bySubject = useMemo(
    () =>
      session.subjects.map((s) => ({
        subject: getSubject(s)!,
        questions: session.questionIds.map((id) => QUESTIONS_BY_ID.get(id)).filter((q): q is Question => q?.subject === s),
      })),
    [session.subjects, session.questionIds],
  )

  const current = bySubject[subjectIdx]
  const question = current.questions[qIdx]
  const remaining = session.durationSeconds - (now - session.startedAt) / 1000
  const answeredCount = Object.keys(session.answers).length

  const choose = useCallback(
    (option: number) =>
      setSession((s) => {
        const next = { ...s, answers: { ...s.answers, [question.id]: option } }
        saveSession(next)
        return next
      }),
    [question.id],
  )

  const go = useCallback(
    (delta: number) => {
      const target = qIdx + delta
      if (target >= 0 && target < current.questions.length) return setQIdx(target)
      // Roll over into the next / previous subject
      const nextSubject = subjectIdx + (delta > 0 ? 1 : -1)
      if (nextSubject < 0 || nextSubject >= bySubject.length) return
      setSubjectIdx(nextSubject)
      setQIdx(delta > 0 ? 0 : bySubject[nextSubject].questions.length - 1)
    },
    [qIdx, subjectIdx, current.questions.length, bySubject],
  )

  const submit = useCallback(async () => {
    if (submittedRef.current) return
    submittedRef.current = true
    setSubmitting(true)
    const durationSeconds = Math.min(session.durationSeconds, Math.round((Date.now() - session.startedAt) / 1000))
    const payload = {
      deviceId: getDeviceId(),
      nickname: session.nickname,
      mode: session.mode,
      questionIds: session.questionIds,
      answers: session.answers,
      durationSeconds,
    }
    let attempt: AttemptRow
    let saved = true
    try {
      const res = await fetch('/api/attempts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error(await res.text())
      attempt = await res.json()
    } catch {
      // Still show the student their result if the network drops.
      saved = false
      const g = gradeAttempt(session.questionIds, session.answers)
      attempt = {
        id: 0, nickname: session.nickname, mode: session.mode, subjects: g.subjects, correct: g.correct, totalQuestions: g.total,
        score: g.score, maxScore: g.maxScore, durationSeconds, breakdown: g.breakdown, createdAt: new Date().toISOString(),
      }
    }
    saveResult({ attempt, questionIds: session.questionIds, answers: session.answers, saved })
    clearSession()
    navigate({ to: '/result' })
  }, [session, navigate])

  // Timer — auto-submit when time is up
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  useEffect(() => {
    if (remaining <= 0) submit()
  }, [remaining, submit])

  // JAMB-style keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || submitting) return
      const k = e.key.toLowerCase()
      if (confirming) {
        if (k === 'y' || k === 'enter') submit()
        if (k === 'escape' || k === 'n') setConfirming(false)
        return
      }
      const letter = LETTERS.findIndex((l) => l.toLowerCase() === k)
      if (letter >= 0) return choose(letter)
      if (k === 'n' || e.key === 'ArrowRight') go(1)
      if (k === 'p' || e.key === 'ArrowLeft') go(-1)
      if (k === 's') setConfirming(true)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [choose, go, confirming, submit, submitting])

  // Warn before leaving mid-exam
  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (!submittedRef.current) e.preventDefault()
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [])

  const lowTime = remaining < 120
  const isLast = subjectIdx === bySubject.length - 1 && qIdx === current.questions.length - 1

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      {/* Top bar */}
      <header className="border-b-2 border-ink bg-paper">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Logo />
          <div className="flex items-center gap-3">
            <div className="hidden text-right text-sm sm:block">
              <div className="font-semibold">{session.nickname}</div>
              <div className="font-mono text-xs text-ink/50">{modeLabel(session.mode)} · {answeredCount}/{session.questionIds.length} answered</div>
            </div>
            <div
              className={`flex items-center gap-2 rounded-lg border-2 border-ink px-3 py-2 font-mono text-lg font-bold ${lowTime ? 'animate-pulse bg-clay text-white' : 'bg-sun'}`}
              aria-live="polite"
            >
              <Clock3 className="h-4 w-4" /> {formatTime(remaining)}
            </div>
            <button
              onClick={() => setConfirming(true)}
              className="flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 font-semibold text-cream hover:bg-forest-dark"
            >
              <Send className="h-4 w-4" /> Submit
            </button>
          </div>
        </div>
        {/* Subject tabs */}
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4">
          {bySubject.map(({ subject, questions }, i) => {
            const done = questions.filter((q) => q.id in session.answers).length
            return (
              <button
                key={subject.id}
                onClick={() => { setSubjectIdx(i); setQIdx(0) }}
                className={`shrink-0 rounded-t-lg border-2 border-b-0 px-4 py-2 text-sm font-semibold transition ${
                  i === subjectIdx ? 'border-ink bg-forest text-cream' : 'border-transparent text-ink/60 hover:bg-ink/5'
                }`}
              >
                {subject.name} <span className="ml-1 font-mono text-xs opacity-70">{done}/{questions.length}</span>
              </button>
            )
          })}
        </nav>
      </header>

      <main className="mx-auto grid w-full max-w-6xl flex-1 gap-6 px-4 py-6 lg:grid-cols-[1fr_300px]">
        {/* Question */}
        <section className="flex flex-col rounded-2xl border-2 border-ink bg-paper p-6 shadow-[6px_6px_0_0_var(--color-ink)] sm:p-8">
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-ink/50">
            <span>Question {qIdx + 1} of {current.questions.length}</span>
            <span className="flex items-center gap-1"><Flag className="h-3 w-3" /> {question.topic}</span>
          </div>
          <h2 className="mt-4 text-xl font-medium leading-relaxed sm:text-2xl">{question.question}</h2>
          <div className="mt-8 grid gap-3">
            {question.options.map((opt, i) => {
              const picked = session.answers[question.id] === i
              return (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  className={`flex items-center gap-4 rounded-xl border-2 px-4 py-3.5 text-left text-lg transition ${
                    picked ? 'border-forest bg-forest/10' : 'border-ink/15 hover:border-ink/50 hover:bg-cream'
                  }`}
                >
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border-2 font-mono font-bold ${picked ? 'border-forest bg-forest text-cream' : 'border-ink/30'}`}>
                    {LETTERS[i]}
                  </span>
                  {opt}
                </button>
              )
            })}
          </div>
          <div className="mt-auto flex items-center justify-between pt-8">
            <button
              onClick={() => go(-1)}
              disabled={subjectIdx === 0 && qIdx === 0}
              className="flex items-center gap-1 rounded-lg border-2 border-ink px-4 py-2.5 font-semibold hover:bg-cream disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            {isLast ? (
              <button onClick={() => setConfirming(true)} className="flex items-center gap-2 rounded-lg bg-forest px-5 py-2.5 font-semibold text-cream hover:bg-forest-dark">
                Finish <Send className="h-4 w-4" />
              </button>
            ) : (
              <button onClick={() => go(1)} className="flex items-center gap-1 rounded-lg bg-ink px-5 py-2.5 font-semibold text-cream hover:bg-forest-dark">
                Next <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </section>

        {/* Navigator */}
        <aside className="h-fit rounded-2xl border-2 border-ink bg-paper p-5">
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink/50">{current.subject.name}</p>
          <div className="mt-3 grid grid-cols-6 gap-2">
            {current.questions.map((q, i) => {
              const answered = q.id in session.answers
              return (
                <button
                  key={q.id}
                  onClick={() => setQIdx(i)}
                  className={`aspect-square rounded-md border-2 font-mono text-sm font-bold transition ${
                    i === qIdx ? 'border-ink ring-2 ring-sun' : 'border-ink/20'
                  } ${answered ? 'bg-forest text-cream' : 'bg-cream hover:border-ink/60'}`}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>
          <div className="mt-4 flex gap-4 text-xs text-ink/60">
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-forest" /> Answered</span>
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm border border-ink/30 bg-cream" /> Not answered</span>
          </div>
          <div className="mt-5 rounded-lg bg-cream p-3 font-mono text-[11px] leading-relaxed text-ink/60">
            <b>Keys:</b> A B C D answer · N next · P previous · S submit
          </div>
        </aside>
      </main>

      {confirming && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/60 px-4 backdrop-blur-sm" onClick={() => !submitting && setConfirming(false)}>
          <div className="w-full max-w-md rounded-2xl border-2 border-ink bg-paper p-7 shadow-[8px_8px_0_0_var(--color-ink)]" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-2xl font-bold">Submit your exam?</h3>
            <p className="mt-2 text-ink/70">
              You have answered <b>{answeredCount}</b> of <b>{session.questionIds.length}</b> questions.
              {answeredCount < session.questionIds.length && ' Unanswered questions are marked wrong.'}
            </p>
            <div className="mt-6 flex gap-3">
              <button disabled={submitting} onClick={() => setConfirming(false)} className="flex-1 rounded-xl border-2 border-ink px-4 py-3 font-semibold hover:bg-cream">
                Go back (N)
              </button>
              <button disabled={submitting} onClick={submit} className="flex-1 rounded-xl bg-forest px-4 py-3 font-semibold text-cream hover:bg-forest-dark disabled:opacity-60">
                {submitting ? 'Marking…' : 'Yes, submit (Y)'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
