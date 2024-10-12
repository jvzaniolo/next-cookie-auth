import { createId } from '@paralleldrive/cuid2'
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from './users'

export const goals = pgTable('goals', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId()),
	title: text('title').notNull(),
	desiredWeeklyFrequency: integer('desired_weekly_frequency').notNull(),
	userId: text('user_id')
		.references(() => users.id, {
			onDelete: 'cascade',
		})
		.notNull(),
	createdAt: timestamp('created_at', { withTimezone: true })
		.notNull()
		.defaultNow(),
})
