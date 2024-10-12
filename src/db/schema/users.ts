import { createId } from '@paralleldrive/cuid2'
import { pgTable, text } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId()),
	email: text('email').unique().notNull(),
	passwordHash: text('password_hash').notNull(),
})
