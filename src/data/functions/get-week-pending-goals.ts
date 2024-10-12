import { db } from '@/db/drizzle'
import { goalCompletions, goals } from '@/db/schema'
import { verifySession } from '@/lib/session'
import dayjs from 'dayjs'
import { and, count, eq, gte, lte, sql } from 'drizzle-orm'

export async function getWeekPendingGoals() {
	const session = await verifySession()

	const firstDayOfWeek = dayjs().startOf('week').toDate()
	const lastDayOfWeek = dayjs().endOf('week').toDate()

	const goalsCreatedUpToWeek = db.$with('goals_created_up_to_week').as(
		db
			.select({
				id: goals.id,
				title: goals.title,
				desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
				createdAt: goals.createdAt,
			})
			.from(goals)
			.where(
				and(
					lte(goals.createdAt, lastDayOfWeek),
					eq(goals.userId, session.userId)
				)
			)
	)

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
					lte(goalCompletions.createdAt, lastDayOfWeek)
				)
			)
			.groupBy(goalCompletions.goalId)
	)

	const pendingGoals = await db
		.with(goalsCreatedUpToWeek, goalCompletionCounts)
		.select({
			id: goalsCreatedUpToWeek.id,
			title: goalsCreatedUpToWeek.title,
			desiredWeeklyFrequency: goalsCreatedUpToWeek.desiredWeeklyFrequency,
			completionCount: sql /*sql*/`
        COALESCE(${goalCompletionCounts.completionCount}, 0)
      `.mapWith(Number),
		})
		.from(goalsCreatedUpToWeek)
		.leftJoin(
			goalCompletionCounts,
			eq(goalCompletionCounts.goalId, goalsCreatedUpToWeek.id)
		)

	return { pendingGoals }
}
