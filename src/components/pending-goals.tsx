import { completeGoal, destroyGoal } from '@/app/actions'
import { getWeekPendingGoals } from '@/data/functions/get-week-pending-goals'
import { Loader, Plus, Trash2 } from 'lucide-react'
import { PendingButton } from './pending-button'
import { OutlineButton } from './ui/outline-button'

export async function PendingGoals() {
	const { pendingGoals } = await getWeekPendingGoals()

	return (
		<div className="flex flex-wrap gap-3">
			{pendingGoals.map((goal) => {
				const isDisabled = goal.completionCount >= goal.desiredWeeklyFrequency

				return (
					<form key={goal.id} action={completeGoal} className="relative">
						<input type="hidden" name="goalId" value={goal.id} />

						<OutlineButton type="submit" disabled={isDisabled}>
							<Plus className="size-4 text-zinc-600 group-aria-busy:hidden" />
							<Loader className="hidden size-4 animate-spin text-zinc-600 group-aria-busy:inline" />
							{goal.title}
						</OutlineButton>

						{isDisabled && (
							<PendingButton
								type="submit"
								formAction={destroyGoal}
								className="group absolute inset-0 z-10 flex cursor-pointer items-center justify-center gap-2 rounded-full border border-pink-700 bg-pink-700 px-3 py-2 text-sm opacity-0 transition-all duration-300 hover:opacity-100"
								title="Excluir meta"
								aria-label="Excluir meta"
							>
								<Trash2 className="size-4 shrink-0 group-aria-disabled:hidden" />
								<Loader className="hidden size-4 shrink-0 animate-spin group-aria-disabled:inline" />
							</PendingButton>
						)}
					</form>
				)
			})}
		</div>
	)
}
