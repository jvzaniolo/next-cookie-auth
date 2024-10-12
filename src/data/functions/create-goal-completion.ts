import { db } from '@/db/drizzle'
import { goalCompletions, goals } from '@/db/schema'
import { verifySession } from '@/lib/session'
import dayjs from 'dayjs'
import { and, count, eq, gte, lte } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

interface CreateGoalCompletionRequest {
	goalId: string
}

export async function createGoalCompletion({
	goalId,
}: CreateGoalCompletionRequest) {
	const session = await verifySession()

	const firstDayOfWeek = dayjs().startOf('week').toDate()
	const lastDayOfWeek = dayjs().endOf('week').toDate()

	const goalCompletionCounts = db.$with('goal_completion_counts').as(
		db
			.select({
				goalId: goalCompletions.goalId,
				completionCount: count(goalCompletions.id).as('completionCount'),
			})
			.from(goalCompletions)
			.where(
				and(
					gte(goalCompletions.createdAt, firstDayOfWeek),
					lte(goalCompletions.createdAt, lastDayOfWeek),
					eq(goalCompletions.goalId, goalId)
				)
			)
			.groupBy(goalCompletions.goalId)
	)

	const result = await db
		.with(goalCompletionCounts)
		.select({
			desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
			completionCount: sql /*sql*/`
        COALESCE(${goalCompletionCounts.completionCount}, 0)
      `.mapWith(Number),
		})
		.from(goals)
		.leftJoin(goalCompletionCounts, eq(goalCompletionCounts.goalId, goals.id))
		.where(and(eq(goals.id, goalId), eq(goals.userId, session.userId)))
		.limit(1)

	const { completionCount, desiredWeeklyFrequency } = result[0]

	if (completionCount >= desiredWeeklyFrequency) {
		throw new Error('Goal already completed this week!')
	}

	const insertResult = await db
		.insert(goalCompletions)
		.values({ goalId })
		.returning()
	const goalCompletion = insertResult[0]

	return {
		goalCompletion,
	}
}
