import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, BookOpenCheck, Clock3, Keyboard, ListChecks, Trophy, Target } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SiteFooter, SiteHeader } from '@/components/SiteHeader'
import { QUESTIONS, SUBJECTS, getSubject, questionsFor } from '@/data/questions'

export const Route = createFileRoute('/')({ component: Home })

const heroImg = '/.netlify/images?url=/img/hero-student.png&w=1100&fm=webp&q=78'

function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <Hero />
      <StatsStrip />
      <Subjects />
      <HowItWorks />
      <Features />
      <Leaderboard />
      <Faq />
      <FinalCta />
      <SiteFooter />
    </div>
  )
}

function Hero() {
  return (
    <section className="grid-paper relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-14 lg:grid-cols-[1.05fr_1fr] lg:pt-20">
        <div className="rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            <span className="h-2 w-2 animate-pulse rounded-full bg-clay" /> UTME 2027 preparation is open
          </span>
          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Sit the JAMB CBT <span className="relative whitespace-nowrap text-forest">
              before
              <svg viewBox="0 0 200 12" className="absolute -bottom-2 left-0 w-full" aria-hidden>
                <path d="M2 9 C 50 2, 150 2, 198 8" stroke="var(--color-sun)" strokeWidth="5" fill="none" strokeLinecap="round" />
              </svg>
            </span>{' '}
            exam day.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75">
            Practise past questions on a screen that works like the real UTME: same subject tabs, the same timer and
            keyboard shortcuts. Get your score out of 400 straight away, with an explanation for every answer.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/practice"
              className="group inline-flex items-center gap-2 rounded-xl bg-forest px-6 py-4 text-lg font-semibold text-cream shadow-[5px_5px_0_0_var(--color-ink)] transition hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_var(--color-ink)]"
            >
              Start free practice
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
            <span className="text-sm text-ink/60">No sign-up. Works on phone & laptop.</span>
          </div>
        </div>

        <div className="rise relative" style={{ animationDelay: '120ms' }}>
          <div className="relative overflow-hidden rounded-2xl border-2 border-ink shadow-[10px_10px_0_0_var(--color-ink)]">
            <img src={heroImg} alt="A student practising on a computer in a CBT centre" className="aspect-[3/2] w-full object-cover" />
          </div>
          <div className="absolute -bottom-8 -left-4 w-64 rotate-[-3deg] rounded-xl border-2 border-ink bg-paper p-4 shadow-[5px_5px_0_0_var(--color-ink)] sm:-left-10">
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink/50">Result slip</p>
            <div className="mt-2 flex items-end justify-between">
              <span className="font-display text-4xl font-extrabold">312</span>
              <span className="font-mono text-sm text-ink/50">/ 400</span>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-1.5 font-mono text-[11px]">
              {[['ENG', 78], ['MTH', 84], ['PHY', 72], ['CHM', 78]].map(([s, v]) => (
                <div key={s} className="rounded bg-cream px-1.5 py-1 text-center">
                  <div className="text-ink/50">{s}</div>
                  <div className="font-bold">{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -right-3 -top-5 flex items-center gap-2 rounded-lg border-2 border-ink bg-sun px-3 py-2 font-mono text-sm font-bold shadow-[4px_4px_0_0_var(--color-ink)]">
            <Clock3 className="h-4 w-4" /> 01:59:42
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsStrip() {
  const stats = [
    { value: `${QUESTIONS.length}+`, label: 'questions with explanations' },
    { value: `${SUBJECTS.length}`, label: 'UTME subjects' },
    { value: '400', label: 'scored like the real exam' },
    { value: '₦0', label: 'free to use' },
  ]
  return (
    <section className="border-y-2 border-ink bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-cream/15 px-5 sm:grid-cols-4 sm:divide-x">
        {stats.map((s) => (
          <div key={s.label} className="px-4 py-7 text-center">
            <div className="font-display text-3xl font-extrabold text-sun sm:text-4xl">{s.value}</div>
            <div className="mt-1 text-sm text-cream/70">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Subjects() {
  return (
    <section id="subjects" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
      <SectionHead kicker="Subjects" title="Pick your four. English is always one of them." />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SUBJECTS.map((s) => {
          const qs = questionsFor(s.id)
          const topics = [...new Set(qs.map((q) => q.topic))]
          return (
            <Link
              key={s.id}
              to="/practice"
              search={{ subject: s.id }}
              className="group relative overflow-hidden rounded-2xl border-2 border-ink bg-paper p-5 transition hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--color-ink)]"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-md px-2 py-1 font-mono text-xs font-bold text-white" style={{ background: s.color }}>
                  {s.short}
                </span>
                {s.compulsory && (
                  <span className="rounded-full bg-sun px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide">Compulsory</span>
                )}
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">{s.name}</h3>
              <p className="mt-1 text-sm text-ink/60">{qs.length} questions · {topics.length} topics</p>
              <p className="mt-3 line-clamp-2 text-xs text-ink/50">{topics.slice(0, 5).join(' · ')}</p>
              <ArrowRight className="absolute bottom-5 right-5 h-5 w-5 -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
            </Link>
          )
        })}
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { icon: ListChecks, title: 'Choose subjects', body: 'Use of English plus the three subjects for your course. Or drill a single subject.' },
    { icon: Clock3, title: 'Beat the clock', body: 'Every session is a 2-hour mock with 50 fresh questions per subject, drawn at random from 400. The timer submits for you when it runs out.' },
    { icon: Target, title: 'Review & improve', body: 'Get your score per subject, then go through every question with the correct answer and why.' },
  ]
  return (
    <section id="how" className="scroll-mt-20 border-y-2 border-ink bg-forest text-cream">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHead kicker="How it works" title="Three steps. Under a minute to start." light />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl border-2 border-cream/20 bg-forest-dark/60 p-6">
              <span className="absolute -top-5 left-6 grid h-10 w-10 place-items-center rounded-full border-2 border-ink bg-sun font-mono font-bold text-ink">
                {i + 1}
              </span>
              <s.icon className="mt-4 h-7 w-7 text-sun" />
              <h3 className="mt-4 font-display text-2xl font-bold">{s.title}</h3>
              <p className="mt-2 text-cream/75">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Features() {
  const items = [
    { icon: Keyboard, title: 'Real CBT shortcuts', body: 'Press A–D to answer, N/P to move, S to submit, the same keys used at JAMB centres.' },
    { icon: BookOpenCheck, title: 'Explanations for every answer', body: 'Every question tells you why the right answer is right, so each mistake teaches you something.' },
    { icon: Trophy, title: 'Weekly leaderboard', body: 'Compare your score with other 2027 candidates. Use a nickname, or stay anonymous.' },
    { icon: ListChecks, title: 'Question navigator', body: 'Jump to any question, see what you have answered and go back to the ones you skipped.' },
  ]
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <SectionHead kicker="Built for the CBT" title="Practise on the same layout you will see on exam day." />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {items.map((f) => (
          <div key={f.title} className="flex gap-4 rounded-2xl border border-ink/15 bg-paper p-6">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-cream">
              <f.icon className="h-6 w-6 text-forest" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">{f.title}</h3>
              <p className="mt-1 text-ink/65">{f.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

interface LeaderRow {
  id: number
  nickname: string
  score: number
  maxScore: number
  subjects: string[]
}

function Leaderboard() {
  const [rows, setRows] = useState<LeaderRow[] | null>(null)
  useEffect(() => {
    fetch('/api/leaderboard')
      .then((r) => (r.ok ? r.json() : []))
      .then(setRows)
      .catch(() => setRows([]))
  }, [])

  return (
    <section className="grid-paper border-y-2 border-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHead kicker="This week" title="Top CBT scores from 2027 candidates." />
          <p className="mt-4 max-w-md text-ink/65">
            Every finished session is marked on our server and ranked here. Finish a session to add your name.
          </p>
          <Link to="/practice" className="mt-6 inline-flex items-center gap-2 font-semibold text-forest underline decoration-sun decoration-4 underline-offset-4">
            Take a mock now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="overflow-hidden rounded-2xl border-2 border-ink bg-paper shadow-[6px_6px_0_0_var(--color-ink)]">
          <div className="grid grid-cols-[3rem_1fr_auto] border-b-2 border-ink bg-ink px-5 py-3 font-mono text-xs uppercase tracking-widest text-cream/70">
            <span>#</span><span>Candidate</span><span>Score</span>
          </div>
          {rows === null && <div className="p-8 text-center text-ink/50">Loading leaderboard…</div>}
          {rows?.length === 0 && (
            <div className="p-8 text-center text-ink/60">
              No scores yet this week. <Link to="/practice" className="font-semibold text-forest underline">Get the top spot.</Link>
            </div>
          )}
          {rows?.map((r, i) => (
            <div key={r.id} className="grid grid-cols-[3rem_1fr_auto] items-center border-b border-ink/10 px-5 py-3 last:border-0">
              <span className={`font-mono font-bold ${i < 3 ? 'text-clay' : 'text-ink/40'}`}>{String(i + 1).padStart(2, '0')}</span>
              <div className="min-w-0">
                <div className="truncate font-semibold">{r.nickname}</div>
                <div className="truncate font-mono text-[11px] text-ink/50">{r.subjects.map((s) => getSubject(s)?.short ?? s).join(' · ')}</div>
              </div>
              <span className="font-mono font-bold">
                {r.score}<span className="text-ink/40">/{r.maxScore}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Faq() {
  const faqs = [
    { q: 'Is JambPass CBT free?', a: 'Yes. Practice, scoring, explanations and your score history are all free. You don\'t need an account.' },
    { q: 'How is my score calculated?', a: 'Like the UTME, each subject is scored out of 100 based on the percentage you get right, giving a total out of 400 for four subjects.' },
    { q: 'Are these the exact JAMB questions?', a: 'The questions follow the official UTME syllabus and the style of past JAMB papers. We add more subjects and questions regularly for the 2027 season.' },
    { q: 'Will my scores be saved?', a: 'Yes. Your results are saved to this browser, so you can see your progress under "My scores" on the same device.' },
  ]
  return (
    <section className="mx-auto max-w-3xl px-5 py-20">
      <SectionHead kicker="FAQ" title="Questions candidates ask" center />
      <div className="mt-10 divide-y-2 divide-ink/10 rounded-2xl border-2 border-ink bg-paper">
        {faqs.map((f) => (
          <details key={f.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-lg font-bold">
              {f.q}
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cream font-mono transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-ink/70">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="px-5 pb-20">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border-2 border-ink bg-sun p-10 text-center shadow-[8px_8px_0_0_var(--color-ink)] sm:p-16">
        <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Your 2027 score starts with one mock.</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-ink/75">Sit a full mock today and see where you are.</p>
        <Link
          to="/practice"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-ink px-7 py-4 text-lg font-semibold text-cream transition hover:bg-forest-dark"
        >
          Start the CBT <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  )
}

function SectionHead({ kicker, title, light, center }: { kicker: string; title: string; light?: boolean; center?: boolean }) {
  return (
    <div className={center ? 'text-center' : ''}>
      <p className={`font-mono text-xs font-bold uppercase tracking-[0.2em] ${light ? 'text-sun' : 'text-clay'}`}>{kicker}</p>
      <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl" style={center ? { marginInline: 'auto' } : undefined}>
        {title}
      </h2>
    </div>
  )
}
