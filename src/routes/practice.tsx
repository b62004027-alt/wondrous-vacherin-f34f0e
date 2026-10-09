import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Check, Lock, Play } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SiteHeader } from '@/components/SiteHeader'
import { EXAM_MODES, SUBJECTS, getSubject, questionsFor, type SubjectId } from '@/data/questions'
import { getNickname, setNickname } from '@/lib/device'
import { createSession } from '@/lib/session'

export const Route = createFileRoute('/practice')({
  validateSearch: (search: Record<string, unknown>): { subject?: SubjectId } => {
    const subject = typeof search.subject === 'string' && getSubject(search.subject) ? (search.subject as SubjectId) : undefined
    return subject ? { subject } : {}
  },
  head: () => ({ meta: [{ title: 'Set up your CBT — JambPass' }] }),
  component: Practice,
})

const MAX_SUBJECTS = 4

function Practice() {
  const { subject } = Route.useSearch()
  const navigate = useNavigate()
  const [utmeCombo, setUtmeCombo] = useState(true)
  const [selected, setSelected] = useState<SubjectId[]>(() => ['english', ...(subject && subject !== 'english' ? [subject] : [])])
  const [name, setName] = useState('')

  useEffect(() => setName(getNickname()), [])

  const toggle = (id: SubjectId) => {
    if (utmeCombo && id === 'english') return
    if (!utmeCombo) return setSelected([id])
    setSelected((cur) => (cur.includes(id) ? cur.filter((s) => s !== id) : cur.length >= MAX_SUBJECTS ? cur : [...cur, id]))
  }

  const switchCombo = (combo: boolean) => {
    setUtmeCombo(combo)
    setSelected(combo ? ['english', ...selected.filter((s) => s !== 'english').slice(0, 3)] : [selected.find((s) => s !== 'english') ?? 'english'])
  }

  const exam = EXAM_MODES.full
  const totalQuestions = selected.reduce((n, s) => n + Math.min(questionsFor(s).length, exam.perSubject), 0)
  const ready = utmeCombo ? selected.length >= 2 : selected.length === 1

  const start = () => {
    if (!ready) return
    const nickname = name.trim().slice(0, 32)
    setNickname(nickname)
    createSession(selected, 'full', nickname || 'Anonymous')
    navigate({ to: '/exam' })
  }

  return (
    <div className="grid-paper min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-5 py-12">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-clay">Exam setup</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Set up your CBT session</h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-8">
            <Step n={1} title="Your name on the leaderboard">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={32}
                placeholder="e.g. Chidinma A. (optional)"
                className="w-full rounded-xl border-2 border-ink bg-paper px-4 py-3 text-lg outline-none focus:ring-4 focus:ring-sun/60"
              />
            </Step>

            <Step n={2} title="Subjects">
              <div className="mb-4 inline-flex rounded-xl border-2 border-ink bg-paper p-1 text-sm font-semibold">
                {[[true, 'UTME combination'], [false, 'Single subject']].map(([v, label]) => (
                  <button
                    key={String(v)}
                    onClick={() => switchCombo(v as boolean)}
                    className={`rounded-lg px-4 py-2 transition ${utmeCombo === v ? 'bg-ink text-cream' : 'hover:bg-ink/5'}`}
                  >
                    {label as string}
                  </button>
                ))}
              </div>
              <p className="mb-4 text-sm text-ink/60">
                {utmeCombo ? `Use of English is compulsory. Add up to 3 more (${selected.length}/${MAX_SUBJECTS} selected).` : 'Focus on one subject at a time.'}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {SUBJECTS.map((s) => {
                  const on = selected.includes(s.id)
                  const locked = utmeCombo && s.id === 'english'
                  const full = utmeCombo && !on && selected.length >= MAX_SUBJECTS
                  return (
                    <button
                      key={s.id}
                      onClick={() => toggle(s.id)}
                      disabled={full}
                      className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition ${
                        on ? 'border-ink bg-paper shadow-[4px_4px_0_0_var(--color-ink)]' : 'border-ink/20 bg-paper/60 hover:border-ink/50'
                      } ${full ? 'cursor-not-allowed opacity-40' : ''}`}
                    >
                      <span className="rounded-md px-2 py-1 font-mono text-[11px] font-bold text-white" style={{ background: s.color }}>{s.short}</span>
                      <span className="flex-1 font-semibold">{s.name}</span>
                      <span className={`grid h-6 w-6 place-items-center rounded-md border-2 ${on ? 'border-forest bg-forest text-cream' : 'border-ink/25'}`}>
                        {locked ? <Lock className="h-3.5 w-3.5" /> : on && <Check className="h-4 w-4" />}
                      </span>
                    </button>
                  )
                })}
              </div>
            </Step>

            <Step n={3} title="Session format">
              <div className="rounded-xl border-2 border-ink bg-sun p-4 shadow-[4px_4px_0_0_var(--color-ink)]">
                <div className="font-display text-lg font-bold">{exam.label}</div>
                <div className="mt-1 text-sm text-ink/70">{exam.description}. Every session draws a fresh set, so no two papers are the same.</div>
              </div>
            </Step>
          </div>

          <aside className="h-fit rounded-2xl border-2 border-ink bg-paper p-6 shadow-[6px_6px_0_0_var(--color-ink)] lg:sticky lg:top-24">
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink/50">Exam slip</p>
            <dl className="mt-4 space-y-3 text-sm">
              <Row label="Candidate" value={name.trim() || 'Anonymous'} />
              <Row label="Subjects" value={selected.map((s) => getSubject(s)!.short).join(' · ')} />
              <Row label="Questions" value={String(totalQuestions)} />
              <Row label="Time" value={`${exam.minutes} min`} />
            </dl>
            <button
              onClick={start}
              disabled={!ready}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-forest px-5 py-4 text-lg font-semibold text-cream transition hover:bg-forest-dark disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Play className="h-5 w-5" /> Start exam
            </button>
            {!ready && <p className="mt-3 text-center text-xs text-clay">Add at least one more subject to English.</p>}
            <p className="mt-4 text-xs text-ink/50">Shortcuts: A–D to answer · N next · P previous · S submit</p>
          </aside>
        </div>
      </main>
    </div>
  )
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 flex items-center gap-3 font-display text-xl font-bold">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-ink font-mono text-sm text-sun">{n}</span>
        {title}
      </h2>
      {children}
    </section>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-dashed border-ink/15 pb-2">
      <dt className="text-ink/55">{label}</dt>
      <dd className="truncate text-right font-mono font-bold">{value}</dd>
    </div>
  )
}
