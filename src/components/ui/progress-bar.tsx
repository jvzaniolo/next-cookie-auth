import * as ProgressPrimitive from '@radix-ui/react-progress'

export function Progress(props: ProgressPrimitive.ProgressProps) {
	return (
		<ProgressPrimitive.Progress
			{...props}
			className="h-2 rounded-full bg-zinc-900"
		/>
	)
}

export function ProgressIndicator(
	props: ProgressPrimitive.ProgressIndicatorProps
) {
	return (
		<ProgressPrimitive.Indicator
			{...props}
			className="h-2 w-1/2 rounded-full bg-gradient-to-r from-pink-500 to-violet-500"
		/>
	)
}
