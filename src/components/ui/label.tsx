import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export function Label(props: ComponentProps<'label'>) {
	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
		<label
			{...props}
			className={twMerge(
				'mb-2 block font-medium text-sm leading-normal tracking-tight',
				props.className
			)}
		/>
	)
}
