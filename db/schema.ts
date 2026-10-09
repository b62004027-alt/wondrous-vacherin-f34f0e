import { integer, jsonb, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export type SubjectBreakdown = Record<string, { correct: number; total: number; score: number }>

// One row per completed CBT session. Scores are graded on the server from the question bank.
export const attempts = pgTable('attempts', {
  id: serial().primaryKey(),
  deviceId: text('device_id').notNull(),
  nickname: text().notNull(),
  mode: text().notNull(),
  subjects: jsonb().$type<string[]>().notNull(),
  correct: integer().notNull(),
  totalQuestions: integer('total_questions').notNull(),
  score: integer().notNull(),
  maxScore: integer('max_score').notNull(),
  durationSeconds: integer('duration_seconds').notNull(),
  breakdown: jsonb().$type<SubjectBreakdown>().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
