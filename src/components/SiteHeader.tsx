import { Link } from '@tanstack/react-router'

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-forest font-mono text-sm font-bold text-sun shadow-[3px_3px_0_0_var(--color-ink)]">
        JP
      </span>
      <span className="font-display text-xl font-extrabold tracking-tight">
        JambPass<span className="text-forest">CBT</span>
      </span>
    </Link>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-cream/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Logo />
        <nav className="flex items-center gap-1 text-sm font-medium sm:gap-3">
          <a href="/#subjects" className="hidden rounded-md px-3 py-2 hover:bg-ink/5 sm:block">Subjects</a>
          <a href="/#how" className="hidden rounded-md px-3 py-2 hover:bg-ink/5 sm:block">How it works</a>
          <Link to="/history" className="rounded-md px-3 py-2 hover:bg-ink/5" activeProps={{ className: 'bg-ink/5' }}>
            My scores
          </Link>
          <Link
            to="/practice"
            className="rounded-lg bg-ink px-4 py-2 font-semibold text-cream transition hover:bg-forest-dark"
          >
            Start CBT
          </Link>
        </nav>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-cream/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="text-cream">
          <span className="font-display text-lg font-bold">JambPass CBT</span>
          <p className="mt-1 text-cream/60">Free UTME practice for the 2027 exam season.</p>
        </div>
        <p className="max-w-md text-cream/50">
          Independent practice tool. Not affiliated with the Joint Admissions and Matriculation Board (JAMB).
        </p>
      </div>
    </footer>
  )
}
