import { db } from '@/db/drizzle'
import { users } from '@/db/schema'
import * as bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'

export async function authUser({
	email,
	password,
}: {
	email: string
	password: string
}) {
	const [user] = await db.select().from(users).where(eq(users.email, email))

	if (!user) return null

	const matchPasswords = await bcrypt.compare(password, user.passwordHash)

	if (!matchPasswords) return null

	return user
}
