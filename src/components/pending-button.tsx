'use client'

import { useFormStatus } from 'react-dom'

export function PendingButton(props: React.ComponentProps<'button'>) {
	const { pending } = useFormStatus()
	return <button {...props} aria-busy={pending} />
}
