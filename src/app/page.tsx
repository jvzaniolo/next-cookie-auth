import { EmptyGoals } from '@/components/empty-goals'
import { WeeklySummary } from '@/components/weekly-summary'
import { getWeekSummary } from '@/data/functions/get-week-summary'

export default async function Home() {
	const { summary } = await getWeekSummary()

	if (!summary.total) return <EmptyGoals />

	return <WeeklySummary summary={summary} />
}
