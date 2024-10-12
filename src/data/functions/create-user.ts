import { db } from '@/db/drizzle'
import { users } from '@/db/schema'
import * as bcrypt from 'bcrypt'

export async function createUser({
	email,
	password,
}: {
	email: string
	password: string
}) {
	const hashedPassword = await bcrypt.hash(password, 10)

	try {
		const [user] = await db
			.insert(users)
			.values({ email, passwordHash: hashedPassword })
			.returning({ id: users.id })

		return user
	} catch (error) {
		return null
	}
}
