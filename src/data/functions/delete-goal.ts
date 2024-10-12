import { db } from '@/db/drizzle'
import { goals } from '@/db/schema'
import { verifySession } from '@/lib/session'
import { and, eq } from 'drizzle-orm'

export async function deleteGoal({ goalId }: { goalId: string }) {
	const session = await verifySession()

	await db
		.delete(goals)
		.where(and(eq(goals.id, goalId), eq(goals.userId, session.userId)))
}
