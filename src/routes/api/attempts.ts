import { createFileRoute } from '@tanstack/react-router'
import { desc, eq } from 'drizzle-orm'
import { db } from '../../../db/index'
import { attempts } from '../../../db/schema'
import { gradeAttempt, isValidMode } from '@/lib/grading'

export const Route = createFileRoute('/api/attempts')({
  server: {
    handlers: {
      // History for one device (students don't need an account).
      GET: async ({ request }) => {
        const deviceId = new URL(request.url).searchParams.get('deviceId')
        if (!deviceId) return Response.json({ error: 'deviceId is required' }, { status: 400 })
        const rows = await db.select().from(attempts).where(eq(attempts.deviceId, deviceId)).orderBy(desc(attempts.createdAt)).limit(20)
        return Response.json(rows)
      },

      POST: async ({ request }) => {
        const body = await request.json().catch(() => null)
        if (!body || typeof body !== 'object') return Response.json({ error: 'Invalid body' }, { status: 400 })
        const { deviceId, nickname, mode, questionIds, answers, durationSeconds } = body as Record<string, unknown>

        if (typeof deviceId !== 'string' || deviceId.length < 8 || deviceId.length > 64) return Response.json({ error: 'Invalid deviceId' }, { status: 400 })
        if (!isValidMode(mode)) return Response.json({ error: 'Invalid mode' }, { status: 400 })
        if (!Array.isArray(questionIds) || questionIds.length === 0 || questionIds.length > 400 || !questionIds.every((id) => typeof id === 'string'))
          return Response.json({ error: 'Invalid questions' }, { status: 400 })
        if (!answers || typeof answers !== 'object') return Response.json({ error: 'Invalid answers' }, { status: 400 })

        const graded = gradeAttempt(questionIds as string[], answers as Record<string, number>)
        if (graded.total === 0 || graded.subjects.length > 4) return Response.json({ error: 'Invalid questions' }, { status: 400 })

        const name = typeof nickname === 'string' && nickname.trim() ? nickname.trim().slice(0, 32) : 'Anonymous'
        const [row] = await db
          .insert(attempts)
          .values({
            deviceId,
            nickname: name,
            mode,
            subjects: graded.subjects,
            correct: graded.correct,
            totalQuestions: graded.total,
            score: graded.score,
            maxScore: graded.maxScore,
            durationSeconds: Math.max(0, Math.min(Number(durationSeconds) || 0, 4 * 3600)),
            breakdown: graded.breakdown,
          })
          .returning()
        return Response.json(row, { status: 201 })
      },
    },
  },
})
