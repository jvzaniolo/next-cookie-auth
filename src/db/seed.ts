import dayjs from 'dayjs'
import { client, db } from './drizzle'
import { goalCompletions, goals, users } from './schema'

async function main() {
	await db.delete(goalCompletions)
	await db.delete(goals)
	await db.delete(users)

	const [user] = await db
		.insert(users)
		.values({
			email: 'joao@gmail.com',
			passwordHash:
				'$2b$10$V5Xe0Jm4l9t1Vv8e7Qz1QeHj8Z9N5y1c9v8zJL7rQ8uZwWd4jG6Z2',
		})
		.returning({ id: users.id })

	const result = await db
		.insert(goals)
		.values([
			{ title: 'Acordar cedo', desiredWeeklyFrequency: 5, userId: user.id },
			{ title: 'Me exercitar', desiredWeeklyFrequency: 3, userId: user.id },
			{ title: 'Meditar', desiredWeeklyFrequency: 1, userId: user.id },
		])
		.returning()

	const startOfWeek = dayjs().startOf('week')

	await db.insert(goalCompletions).values([
		{ goalId: result[0].id, createdAt: startOfWeek.toDate() },
		{ goalId: result[1].id, createdAt: startOfWeek.add(1, 'day').toDate() },
	])
}

main()
	.catch((error) => {
		console.error(error)
	})
	.finally(() => {
		client.end()
	})
