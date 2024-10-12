import { createId } from '@paralleldrive/cuid2'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { goals } from './goals'

export const goalCompletions = pgTable('goal_completions', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId()),
	goalId: text('goal_id')
		.references(() => goals.id, { onDelete: 'cascade' })
		.notNull(),
	createdAt: timestamp('created_at', { withTimezone: true })
		.notNull()
		.defaultNow(),
})
