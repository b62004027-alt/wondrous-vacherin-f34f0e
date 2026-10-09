import { createFileRoute } from '@tanstack/react-router'
import { desc, gte } from 'drizzle-orm'
import { db } from '../../../db/index'
import { attempts } from '../../../db/schema'

export const Route = createFileRoute('/api/leaderboard')({
  server: {
    handlers: {
      // Top scores from the last 7 days, ranked out of 400 equivalents.
      GET: async () => {
        const since = new Date(Date.now() - 7 * 24 * 3600 * 1000)
        const rows = await db
          .select({
            id: attempts.id,
            nickname: attempts.nickname,
            score: attempts.score,
            maxScore: attempts.maxScore,
            subjects: attempts.subjects,
            mode: attempts.mode,
            createdAt: attempts.createdAt,
          })
          .from(attempts)
          .where(gte(attempts.createdAt, since))
          .orderBy(desc(attempts.score), desc(attempts.createdAt))
          .limit(10)
        return Response.json(rows)
      },
    },
  },
})
