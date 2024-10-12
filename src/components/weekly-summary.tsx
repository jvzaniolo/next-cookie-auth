import type { getWeekSummary } from '@/data/functions/get-week-summary'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { CheckCircle2, Plus } from 'lucide-react'
import { InOrbitIcon } from './in-orbit-icon'
import { PendingGoals } from './pending-goals'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'

dayjs.locale(ptBR)

interface WeeklySummaryProps {
	summary: Awaited<ReturnType<typeof getWeekSummary>>['summary']
}

export function WeeklySummary({ summary }: WeeklySummaryProps) {
	const fromDate = dayjs().startOf('week').format('D[ de ]MMM')
	const toDate = dayjs().endOf('week').format('D[ de ]MMM')

	const completedPercentage = Math.round(
		(summary.completed * 100) / summary.total
	)

	return (
		<main className="mx-auto flex w-full max-w-lg flex-col gap-6 px-5 py-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<InOrbitIcon />
					<span className="font-semibold text-lg">
						{fromDate} - {toDate}
					</span>
				</div>

				<DialogTrigger asChild>
					<Button size="sm">
						<Plus className="size-4" />
						Cadastrar meta
					</Button>
				</DialogTrigger>
			</div>

			<div className="flex flex-col gap-3">
				<Progress value={summary.completed} max={summary.total}>
					<ProgressIndicator style={{ width: `${completedPercentage}%` }} />
				</Progress>

				<div className="flex items-center justify-between text-xs text-zinc-400">
					<span>
						Você completou{' '}
						<span className="text-zinc-100">{summary.completed}</span> de{' '}
						<span className="text-zinc-100">{summary.total}</span> metas nessa
						semana.
					</span>
					<span>{completedPercentage}%</span>
				</div>
			</div>

			<Separator />

			<PendingGoals />

			<div className="space-y-6">
				<h2 className="font-medium text-xl">Sua semana</h2>

				{summary.goalsPerDay &&
					Object.entries(summary.goalsPerDay).map(([date, goals]) => {
						const weekDay = dayjs(date).format('dddd')
						const parsedDate = dayjs(date).format('D[ de ]MMM')

						return (
							<div className="space-y-4" key={date}>
								<h3 className="font-medium capitalize">
									{weekDay}{' '}
									<span className="text-xs text-zinc-400">({parsedDate})</span>
								</h3>

								<ul className="space-y-3">
									{goals.map((goal) => {
										const parsedTime = dayjs(goal.completedAt).format(
											'HH:mm[h]'
										)

										return (
											<li className="flex items-center gap-2" key={goal.id}>
												<CheckCircle2 className="size-4 text-pink-500" />
												<span className="text-sm text-zinc-400">
													Você completou "
													<span className="text-zinc-100">{goal.title}</span>"
													às <span className="text-zinc-100">{parsedTime}</span>
												</span>
											</li>
										)
									})}
								</ul>
							</div>
						)
					})}
			</div>
		</main>
	)
}
