import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { SiteHeader } from '@/components/SiteHeader'
import { getSubject, modeLabel } from '@/data/questions'
import { getDeviceId, type AttemptRow } from '@/lib/device'

export const Route = createFileRoute('/history')({
  head: () => ({ meta: [{ title: 'My scores — JambPass' }] }),
  component: History,
})

function History() {
  const [rows, setRows] = useState<AttemptRow[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`/api/attempts?deviceId=${encodeURIComponent(getDeviceId())}`)
      .then((r) => {
        if (!r.ok) throw new Error()
        return r.json()
      })
      .then(setRows)
      .catch(() => setError(true))
  }, [])

  const best = rows?.length ? Math.max(...rows.map((r) => Math.round((r.score / r.maxScore) * 100))) : null

  return (
    <div className="grid-paper min-h-screen pb-20">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-12">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-clay">Progress</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">My scores</h1>
        <p className="mt-2 text-ink/60">Your last 20 CBT sessions on this device.{best !== null && ` Best so far: ${best}%.`}</p>

        <div className="mt-8 overflow-hidden rounded-2xl border-2 border-ink bg-paper shadow-[6px_6px_0_0_var(--color-ink)]">
          {error && <p className="p-8 text-center text-clay">Couldn't load your scores. Please refresh to try again.</p>}
          {!error && rows === null && <p className="p-8 text-center text-ink/50">Loading…</p>}
          {rows?.length === 0 && (
            <div className="p-10 text-center">
              <p className="text-ink/60">You haven't finished any sessions yet.</p>
              <Link to="/practice" className="mt-5 inline-block rounded-xl bg-forest px-6 py-3 font-semibold text-cream">Start your first CBT</Link>
            </div>
          )}
          {rows?.map((r) => (
            <div key={r.id} className="flex flex-wrap items-center gap-4 border-b border-ink/10 px-5 py-4 last:border-0">
              <div className="min-w-0 flex-1">
                <div className="font-semibold">{modeLabel(r.mode)}</div>
                <div className="font-mono text-xs text-ink/50">
                  {new Date(r.createdAt).toLocaleString()} · {r.subjects.map((s) => getSubject(s)?.short ?? s).join(' · ')}
                </div>
              </div>
              <div className="text-sm text-ink/60">{r.correct}/{r.totalQuestions} correct</div>
              <div className="w-24 text-right font-mono text-xl font-bold">
                {r.score}<span className="text-sm text-ink/40">/{r.maxScore}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
