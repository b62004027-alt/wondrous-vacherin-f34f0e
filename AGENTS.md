# AGENTS.md

JambPass CBT: a JAMB UTME practice site built with TanStack Start on Netlify.

## Architecture

- `src/data/questions.ts`: the question bank, subjects and exam modes. This is the single source of truth, used by both client and server.
- `src/routes/index.tsx`: the landing page. `practice.tsx` sets up the exam, `exam.tsx` runs the CBT, `result.tsx` shows the result slip and review, and `history.tsx` lists past scores.
- `src/routes/api/attempts.ts`: POST grades a submission on the server (via `src/lib/grading.ts`) and saves it; GET `?deviceId=` returns a device's history.
- `src/routes/api/leaderboard.ts`: the top 10 scores from the last 7 days.
- `db/schema.ts`: the Drizzle schema (`attempts` table). Migrations go in `netlify/database/migrations` and are generated with `npx drizzle-kit generate --name <name>`. Never edit applied migrations.
- `src/lib/session.ts`: the in-progress exam and the latest result are kept in `sessionStorage`, so a refresh doesn't lose answers.
- `src/lib/device.ts`: an anonymous device id in `localStorage`. There are no user accounts.

## Conventions

- Tailwind 4 with theme tokens in `src/styles.css` (`ink`, `forest`, `cream`, `paper`, `sun`, `clay`). Fonts are Bricolage Grotesque (display), Instrument Sans and JetBrains Mono.
- The visual style uses hard offset "stamp" shadows (`shadow-[Npx_Npx_0_0_var(--color-ink)]`) with 2px ink borders.
- Imports use the `@/` alias for `src/`.
- Scores follow JAMB: each subject is out of 100 (percentage correct), and the total is the sum of the subjects.
- Images are served through `/.netlify/images?url=/img/...`.
