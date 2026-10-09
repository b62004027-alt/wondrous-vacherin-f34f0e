import { Link, createFileRoute } from '@tanstack/react-router'
import { Check, RotateCcw, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SiteHeader } from '@/components/SiteHeader'
import { QUESTIONS_BY_ID, getSubject, type Question } from '@/data/questions'
import { formatTime } from '@/lib/device'
import { loadResult, type ExamResult } from '@/lib/session'

export const Route = createFileRoute('/result')({
  head: () => ({ meta: [{ title: 'Your CBT result — JambPass' }] }),
  component: Result,
})

const LETTERS = ['A', 'B', 'C', 'D']

function Result() {
  const [result, setResult] = useState<ExamResult | null | undefined>(undefined)
  const [filter, setFilter] = useState<'all' | 'wrong'>('wrong')
  useEffect(() => setResult(loadResult()), [])

  if (result === undefined) return <div className="grid min-h-screen place-items-center text-ink/50">Loading result…</div>
  if (result === null)
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <div className="mx-auto max-w-md px-5 py-24 text-center">
          <h1 className="font-display text-3xl font-bold">No result to show</h1>
          <Link to="/practice" className="mt-6 inline-block rounded-xl bg-forest px-6 py-3 font-semibold text-cream">Take a CBT</Link>
        </div>
      </div>
    )

  const { attempt, answers } = result
  const questions = result.questionIds.map((id) => QUESTIONS_BY_ID.get(id)).filter((q): q is Question => !!q)
  const shown = filter === 'wrong' ? questions.filter((q) => answers[q.id] !== q.answer) : questions
  const pct = Math.round((attempt.score / attempt.maxScore) * 100)
  const verdict = pct >= 70 ? 'Excellent! You are on track for a top score.' : pct >= 50 ? 'Good work. A bit more practice will raise your score.' : 'Keep going. Read the explanations below and try again.'

  return (
    <div className="grid-paper min-h-screen pb-20">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-12">
        <div className="rise rounded-3xl border-2 border-ink bg-paper p-7 shadow-[8px_8px_0_0_var(--color-ink)] sm:p-10">
          <p className="font-mono text-xs uppercase tracking-widest text-ink/50">Result slip · {attempt.nickname}</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="font-display text-7xl font-extrabold leading-none sm:text-8xl">
                {attempt.score}<span className="text-3xl text-ink/40">/{attempt.maxScore}</span>
              </div>
              <p className="mt-3 max-w-md text-ink/70">{verdict}</p>
            </div>
            <div className="font-mono text-sm text-ink/60">
              <div>{attempt.correct}/{attempt.totalQuestions} correct</div>
              <div>Time used: {formatTime(attempt.durationSeconds)}</div>
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {Object.entries(attempt.breakdown).map(([id, b]) => {
              const s = getSubject(id)
              return (
                <div key={id}>
                  <div className="flex justify-between text-sm font-semibold">
                    <span>{s?.name ?? id}</span>
                    <span className="font-mono">{b.score}/100</span>
                  </div>
                  <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-cream">
                    <div className="h-full rounded-full" style={{ width: `${b.score}%`, background: s?.color ?? '#0b5d3b' }} />
                  </div>
                </div>
              )
            })}
          </div>
          {!result.saved && <p className="mt-6 text-sm text-clay">We couldn't save this result to your history because the connection dropped. Your score above is still correct.</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/practice" className="inline-flex items-center gap-2 rounded-xl bg-forest px-5 py-3 font-semibold text-cream hover:bg-forest-dark">
              <RotateCcw className="h-4 w-4" /> Try another
            </Link>
            <Link to="/history" className="rounded-xl border-2 border-ink px-5 py-3 font-semibold hover:bg-cream">My scores</Link>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-3xl font-extrabold">Review answers</h2>
          <div className="inline-flex rounded-xl border-2 border-ink bg-paper p-1 text-sm font-semibold">
            {(['wrong', 'all'] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`rounded-lg px-4 py-2 ${filter === f ? 'bg-ink text-cream' : ''}`}>
                {f === 'wrong' ? 'Mistakes only' : 'All questions'}
              </button>
            ))}
          </div>
        </div>

        {shown.length === 0 && <p className="mt-8 rounded-2xl bg-paper p-8 text-center text-ink/60">No mistakes. Perfect score! 🎉</p>}
        <ol className="mt-6 space-y-4">
          {shown.map((q) => {
            const picked = answers[q.id]
            const right = picked === q.answer
            return (
              <li key={q.id} className="rounded-2xl border-2 border-ink/15 bg-paper p-6">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink/50">
                  {getSubject(q.subject)?.short} · {q.topic}
                  <span className={`ml-auto flex items-center gap-1 rounded-full px-2 py-0.5 font-bold ${right ? 'bg-forest/15 text-forest' : 'bg-clay/15 text-clay'}`}>
                    {right ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    {right ? 'Correct' : picked === undefined ? 'Skipped' : 'Wrong'}
                  </span>
                </div>
                <p className="mt-3 text-lg font-medium">{q.question}</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {q.options.map((opt, i) => (
                    <li
                      key={i}
                      className={`rounded-lg border-2 px-3 py-2 text-sm ${
                        i === q.answer ? 'border-forest bg-forest/10 font-semibold' : i === picked ? 'border-clay bg-clay/10 line-through' : 'border-ink/10'
                      }`}
                    >
                      <span className="mr-2 font-mono font-bold">{LETTERS[i]}.</span>{opt}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 rounded-lg bg-cream p-3 text-sm text-ink/75"><b>Why:</b> {q.explanation}</p>
              </li>
            )
          })}
        </ol>
      </main>
    </div>
  )
}
