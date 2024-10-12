import { db } from '@/db/drizzle'
import { goals } from '@/db/schema'
import { verifySession } from '@/lib/session'

interface CreateGoalRequest {
	title: string
	desiredWeeklyFrequency: number
}

export async function createGoal({
	title,
	desiredWeeklyFrequency,
}: CreateGoalRequest) {
	const session = await verifySession()

	const result = await db
		.insert(goals)
		.values({
			title,
			desiredWeeklyFrequency,
			userId: session.userId,
		})
		.returning()

	const goal = result[0]

	return {
		goal,
	}
}
