'use server'
import { createGoal } from '@/data/functions/create-goal'
import { createGoalCompletion } from '@/data/functions/create-goal-completion'
import { deleteGoal } from '@/data/functions/delete-goal'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function registerGoal(state: unknown, formData: FormData) {
	const createGoalSchema = z.object({
		title: z.string().min(1),
		desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
	})

	const { title, desiredWeeklyFrequency } = createGoalSchema.parse(
		Object.fromEntries(formData)
	)

	await createGoal({ title, desiredWeeklyFrequency })

	revalidatePath('/')
}

export async function completeGoal(formData: FormData) {
	await createGoalCompletion({ goalId: formData.get('goalId') as string })
	revalidatePath('/')
}

export async function destroyGoal(formData: FormData) {
	await deleteGoal({ goalId: formData.get('goalId') as string })
	revalidatePath('/')
}
