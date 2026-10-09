# JambPass CBT

A free JAMB UTME practice site for 2027 candidates. Students pick Use of English plus up to three subjects, take a timed exam on a screen laid out like the real CBT, and get a score out of 400 with an explanation for every question.

## Features

- Landing page with subjects, how it works, a live weekly leaderboard and an FAQ
- Exam setup: UTME combination (English + 3) or single-subject drill; 15-minute, 30-minute or 2-hour sessions
- CBT screen with subject tabs, question navigator, countdown timer that submits automatically, and JAMB-style keys (A–D, N, P, S)
- Answers marked on the server, with per-subject scores out of 100 and a review of mistakes with explanations
- "My scores" history for each browser, with no sign-up needed

## Tech

TanStack Start (React 19) · Tailwind CSS 4 · Netlify Database (Postgres, Drizzle ORM) · Netlify Image CDN · deployed on Netlify.

## Running locally

```bash
pnpm install
netlify dev
```

## Adding questions

Add entries to `src/data/questions.ts`. Each one needs a unique, stable `id`. To add a new subject, put it in `SUBJECTS` and the `SubjectId` type as well.
